import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { toolNameKey } from "@/lib/tools";

interface FooterProps {
  onRequestTool?: () => void;
}

export function Footer({ onRequestTool }: FooterProps) {
  const { t } = useI18n();

  return (
    <footer className="border-t border-border/60 bg-surface/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
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
        </div>

        <FooterCol title={t("footer.product")}>
          <FooterLink href="/#tools">{t("footer.featured")}</FooterLink>
          <FooterLink href="/#why">{t("nav.why")}</FooterLink>
          <FooterLink href="/#stats">{t("footer.numbers")}</FooterLink>
          <FooterLink href="/#faq">{t("nav.faq")}</FooterLink>
          {onRequestTool && (
            <li>
              <button
                onClick={onRequestTool}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {t("request.trigger")}
              </button>
            </li>
          )}
        </FooterCol>

        <FooterCol title={t("footer.tools")}>
          <li>
            <Link
              to="/tools/translator"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {t(toolNameKey("translator"))}
            </Link>
          </li>
          <li className="text-sm text-muted-foreground/70">{t("footer.more")}</li>
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
      <a href={href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
        {children}
      </a>
    </li>
  );
}
