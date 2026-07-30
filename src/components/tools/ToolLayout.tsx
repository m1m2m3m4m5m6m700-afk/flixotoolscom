import { Link } from "@tanstack/react-router";
import { ArrowLeft, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface ToolLayoutProps {
  icon: LucideIcon;
  name: string;
  description: string;
  category: string;
  children: ReactNode;
}

/** Shared chrome for every tool page — reuse this for future tools. */
export function ToolLayout({ icon: Icon, name, description, category, children }: ToolLayoutProps) {
  return (
    <div className="bg-hero-glow">
      <div className="mx-auto max-w-5xl px-5 pb-20 pt-10 md:pt-14">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          All tools
        </Link>

        <header className="mt-6 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:items-center">
          <div className="flex min-w-0 items-center gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-primary/12 text-primary">
              <Icon className="size-6" />
            </span>
            <div className="min-w-0">
              <h1 className="truncate text-2xl font-bold md:text-3xl">{name}</h1>
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            </div>
          </div>
          <span className="shrink-0 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
            {category}
          </span>
        </header>

        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}
