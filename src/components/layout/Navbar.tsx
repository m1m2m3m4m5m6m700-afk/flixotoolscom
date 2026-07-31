import { Link } from "@tanstack/react-router";
import { Menu, Moon, Sun, Sparkles } from "lucide-react";
import { useState } from "react";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/i18n/locales/en";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

const links: { key: TranslationKey; href: string }[] = [
  { key: "nav.tools", href: "/#categories" },
  { key: "nav.why", href: "/#why" },
  { key: "nav.faq", href: "/#faq" },
];

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-5">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="size-4" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">Flixo</span>
        </Link>

        <nav className="ms-4 hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.key}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
            >
              {t(l.key)}
            </a>
          ))}
          <Link
            to="/compare"
            className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground font-medium"
          >
            Compare
          </Link>
          <Link
            to="/use-cases"
            className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground font-medium"
          >
            Use Cases
          </Link>
          <Link
            to="/file-types"
            className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground font-medium"
          >
            Formats
          </Link>
          <Link
            to="/changelog"
            className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground font-medium"
          >
            Updates
          </Link>
          <Link
            to="/blog"
            className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground font-medium"
          >
            Blog
          </Link>
          <Link
            to="/sitemap"
            className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
          >
            Sitemap
          </Link>
          <Link
            to="/contact"
            className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
          >
            Contact Owner
          </Link>
          <Link
            to="/admin/inbox"
            className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground font-semibold"
          >
            Owner Inbox
          </Link>
        </nav>

        <div className="ms-auto flex shrink-0 items-center gap-1.5">
          <LanguageSwitcher />
          <Button
            variant="ghost"
            size="icon"
            aria-label={t("nav.toggleTheme")}
            onClick={toggleTheme}
            className="rounded-xl"
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
          <Button asChild className="hidden rounded-xl sm:inline-flex">
            <Link to="/tools/translator">{t("nav.openTranslator")}</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label={t("nav.toggleMenu")}
            className="rounded-xl md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <Menu className="size-4" />
          </Button>
        </div>
      </div>

      <div className={cn("border-t border-border/60 md:hidden", open ? "block" : "hidden")}>
        <nav className="mx-auto flex max-w-6xl flex-col gap-1 px-5 py-3">
          {links.map((l) => (
            <a
              key={l.key}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-surface hover:text-foreground"
            >
              {t(l.key)}
            </a>
          ))}
          <Button asChild className="mt-2 rounded-xl">
            <Link to="/tools/translator">{t("nav.openTranslator")}</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
