import { teamMember } from "./teamMember";
import { nickOfTimeProgram } from "./nickOfTimeProgram";
import { contentSource } from "./contentSource";
import { siteSettings } from "./siteSettings";
import {
  imageWithAlt,
  linkItem,
  statItem,
  pageHero,
  ctaButton,
} from "./objects";
import { homePage } from "./homePage";
import { aboutPage } from "./aboutPage";
import {
  eventsPage,
  galleryPage,
  axionPage,
  teamPage,
  contactPage,
} from "./pages";
import { nickOfTimePage } from "./nickOfTimePage";

export const schemaTypes = [
  // Objects
  imageWithAlt,
  linkItem,
  statItem,
  pageHero,
  ctaButton,
  // Singletons / pages
  siteSettings,
  homePage,
  aboutPage,
  teamPage,
  eventsPage,
  galleryPage,
  axionPage,
  nickOfTimePage,
  contactPage,
  // Lists
  teamMember,
  nickOfTimeProgram,
  contentSource,
];
