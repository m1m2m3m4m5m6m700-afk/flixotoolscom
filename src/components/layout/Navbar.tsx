import { Link } from "@tanstack/react-router";
import { Menu, Moon, Sun, Sparkles } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

const links = [
  { label: "Tools", href: "/#tools" },
  { label: "Categories", href: "/#categories" },
  { label: "Why Flixo", href: "/#why" },
  { label: "FAQ", href: "/#faq" },
];

export function Navbar() {
  const { theme, toggleTheme } = useTheme();
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

        <nav className="ml-4 hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle color theme"
            onClick={toggleTheme}
            className="rounded-xl"
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
          <Button asChild className="hidden rounded-xl sm:inline-flex">
            <Link to="/tools/translator">Open Translator</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle navigation"
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
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-surface hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <Button asChild className="mt-2 rounded-xl">
            <Link to="/tools/translator">Open Translator</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
