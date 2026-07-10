import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SutureDivider } from "@/components/layout/SutureDivider";

type PagePlaceholderProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export function PagePlaceholder({
  eyebrow,
  title,
  description,
  children,
}: PagePlaceholderProps) {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-edge py-32 text-center md:py-40">
      <Reveal amount={0.6} className="mx-auto max-w-2xl">
        <p className="mb-5 font-body text-label uppercase text-primary">
          {eyebrow}
        </p>
        <h1 className="mb-6 font-display text-headline-lg text-ink text-balance">
          {title}
        </h1>
        <SutureDivider className="my-8" />
        <p className="text-body-lg leading-relaxed text-ink-muted">
          {description}
        </p>
        {children}
      </Reveal>
    </section>
  );
}
