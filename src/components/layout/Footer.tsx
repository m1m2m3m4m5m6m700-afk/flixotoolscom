import { Link } from "@tanstack/react-router";
import { Sparkles, BarChart3 } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { toolNameKey } from "@/lib/tools";

interface FooterProps {
  onRequestTool?: () => void;
  onOpenAnalytics?: () => void;
}

export function Footer({ onRequestTool, onOpenAnalytics }: FooterProps) {
  const { t } = useI18n();

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
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {t("footer.tagline")}
          </p>
          {onOpenAnalytics && (
            <button
              onClick={onOpenAnalytics}
              className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-border/80 bg-card/60 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              <BarChart3 className="size-3.5 text-primary" />
              Local Analytics
            </button>
          )}
        </div>

        <FooterCol title="SEO & Guides Hub">
          <li>
            <Link
              to="/compare"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground font-medium"
            >
              Tool Comparisons
            </Link>
          </li>
          <li>
            <Link
              to="/use-cases"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground font-medium"
            >
              Use-Case Workflows
            </Link>
          </li>
          <li>
            <Link
              to="/file-types"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground font-medium"
            >
              File Format Directory
            </Link>
          </li>
          <li>
            <Link
              to="/questions"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground font-medium"
            >
              How-To Questions
            </Link>
          </li>
          <li>
            <Link
              to="/collections"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground font-medium"
            >
              Tool Collections
            </Link>
          </li>
          <li>
            <Link
              to="/changelog"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground font-medium"
            >
              Release Changelog
            </Link>
          </li>
        </FooterCol>

        <FooterCol title={t("footer.product")}>
          <FooterLink href="/#tools">{t("footer.featured")}</FooterLink>
          <li>
            <Link
              to="/blog"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground font-medium"
            >
              Flixo Blog & Guides
            </Link>
          </li>
          <li>
            <Link
              to="/sitemap"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              XML & HTML Sitemap
            </Link>
          </li>
          <li>
            <Link
              to="/robots/txt"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Robots.txt Directive
            </Link>
          </li>
          <FooterLink href="/#why">{t("nav.why")}</FooterLink>
          <FooterLink href="/#stats">{t("footer.numbers")}</FooterLink>
          <FooterLink href="/#faq">{t("nav.faq")}</FooterLink>
          <li>
            <Link
              to="/contact"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground font-medium"
            >
              Contact Owner
            </Link>
          </li>
          <li>
            <Link
              to="/admin/inbox"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground font-medium"
            >
              Owner Inbox
            </Link>
          </li>
        </FooterCol>

        <FooterCol title="Category Hubs">
          <li>
            <Link
              to="/image-tools"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Image Tools
            </Link>
          </li>
          <li>
            <Link
              to="/translation-tools"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Translation Hub
            </Link>
          </li>
          <li>
            <Link
              to="/pdf-tools"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              PDF Tools
            </Link>
          </li>
          <li>
            <Link
              to="/video-tools"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Video Tools
            </Link>
          </li>
          <li>
            <Link
              to="/audio-tools"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Audio Tools
            </Link>
          </li>
          {onRequestTool && (
            <li className="pt-2">
              <button
                onClick={onRequestTool}
                className="text-sm text-primary font-bold transition-colors hover:underline"
              >
                + {t("request.trigger")}
              </button>
            </li>
          )}
        </FooterCol>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>{t("footer.rights", { year: new Date().getFullYear() })}</p>
          <p>{t("footer.built")}</p>
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
      <a
        href={href}
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        {children}
      </a>
    </li>
  );
}
