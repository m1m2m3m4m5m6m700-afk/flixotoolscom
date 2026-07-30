import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { categories } from "@/lib/tools";

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-surface/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Sparkles className="size-4" />
            </span>
            <span className="font-display text-lg font-bold">Flixo</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-muted-foreground">
            One calm workspace for every AI tool your team reaches for during the day.
          </p>
        </div>

        <FooterCol title="Product">
          <FooterLink href="/#tools">Featured tools</FooterLink>
          <FooterLink href="/#popular">Popular tools</FooterLink>
          <FooterLink href="/#why">Why Flixo</FooterLink>

          <FooterLink href="/#stats">Numbers</FooterLink>
          <FooterLink href="/#faq">FAQ</FooterLink>
        </FooterCol>

        <FooterCol title="Categories">
          {categories.slice(0, 4).map((c) => (
            <FooterLink key={c.name} href="/#categories">
              {c.name}
            </FooterLink>
          ))}
        </FooterCol>

        <FooterCol title="Tools">
          <li>
            <Link
              to="/tools/translator"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              AI Translator
            </Link>
          </li>
          <li className="text-sm text-muted-foreground/70">More coming soon</li>
        </FooterCol>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Flixo. All rights reserved.</p>
          <p>Built for teams that ship fast.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-semibold">{title}</h3>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <a href={href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
        {children}
      </a>
    </li>
  );
}
