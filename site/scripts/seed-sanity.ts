/**
 * One-time seed: uploads current team + Nick of Time programme content into Sanity.
 *
 * Prerequisites:
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_API_WRITE_TOKEN  (Editor or Admin token from manage.sanity.io)
 *
 * Usage: npm run sanity:seed
 */

import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "node:fs";
import { resolve, basename } from "node:path";
import {
  CUT_ABOVE_TEAM,
  DEPARTMENT_OF_SURGERY,
  LEADERSHIP,
  type TeamMember,
  type TeamTab,
} from "../src/lib/team-content";
import { NICK_OF_TIME_PROGRAMS } from "../src/lib/nick-of-time-content";

function loadEnvLocal() {
  const envPath = resolve(process.cwd(), ".env.local");
  if (!existsSync(envPath)) return;
  const text = readFileSync(envPath, "utf8");
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvLocal();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in .env.local"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

const publicDir = resolve(process.cwd(), "public");
const assetCache = new Map<string, { _type: "reference"; _ref: string }>();

async function uploadImage(
  publicPath: string | null
): Promise<{ _type: "image"; asset: { _type: "reference"; _ref: string } } | undefined> {
  if (!publicPath) return undefined;
  const cached = assetCache.get(publicPath);
  if (cached) {
    return { _type: "image", asset: cached };
  }

  const filePath = resolve(publicDir, publicPath.replace(/^\//, ""));
  if (!existsSync(filePath)) {
    console.warn(`  skip missing image: ${publicPath}`);
    return undefined;
  }

  const buffer = readFileSync(filePath);
  const asset = await client.assets.upload("image", buffer, {
    filename: basename(filePath),
  });
  const ref = { _type: "reference" as const, _ref: asset._id };
  assetCache.set(publicPath, ref);
  return { _type: "image", asset: ref };
}

async function seedTeam() {
  const groups: { tab: TeamTab; members: TeamMember[] }[] = [
    { tab: "leadership", members: LEADERSHIP },
    { tab: "surgery", members: DEPARTMENT_OF_SURGERY },
    { tab: "cut-above", members: CUT_ABOVE_TEAM },
  ];

  for (const { tab, members } of groups) {
    for (let i = 0; i < members.length; i++) {
      const member = members[i];
      const id = `teamMember.${member.id}`;
      const image = await uploadImage(member.image);
      await client.createOrReplace({
        _id: id,
        _type: "teamMember",
        name: member.name,
        designation: member.designation,
        tab,
        order: i,
        ...(image ? { image } : {}),
      });
      console.log(`  team: ${member.name}`);
    }
  }
}

async function seedPrograms() {
  for (let i = 0; i < NICK_OF_TIME_PROGRAMS.length; i++) {
    const program = NICK_OF_TIME_PROGRAMS[i];
    const id = `nickOfTimeProgram.${program.slug}`;
    const image = await uploadImage(program.image);
    if (!image) {
      console.warn(`  skip programme (no image): ${program.slug}`);
      continue;
    }
    await client.createOrReplace({
      _id: id,
      _type: "nickOfTimeProgram",
      title: program.title,
      slug: { _type: "slug", current: program.slug },
      category: program.category,
      group: program.group,
      groupLabel: program.groupLabel,
      description: program.description,
      ...(program.bullets ? { bullets: program.bullets } : {}),
      ...(program.theme ? { theme: program.theme } : {}),
      image,
      alt: program.alt,
      cta: program.cta,
      order: i,
    });
    console.log(`  programme: ${program.title}`);
  }
}

async function seedContentSourceFlags() {
  await client.createOrReplace({
    _id: "contentSource",
    _type: "contentSource",
    teamFromCms: true,
    nickOfTimeProgramsFromCms: true,
  });
  console.log("  content source flags: team + nick of time programmes → CMS");
}

async function main() {
  console.log(`Seeding Sanity project ${projectId} / ${dataset}…`);
  console.log("Team members:");
  await seedTeam();
  console.log("Nick of Time programmes:");
  await seedPrograms();
  console.log("Flags:");
  await seedContentSourceFlags();
  console.log("Done. Open /studio to edit.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
