import { createFileRoute } from "@tanstack/react-router";
import { KeyRound } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { PasswordGenerator } from "@/components/tools/PasswordGenerator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/tools";

export const Route = createFileRoute("/tools/password-generator")({
  head: () => ({
    meta: [
      { title: "Password Generator — Secure Random Passwords | Flixo" },
      {
        name: "description",
        content:
          "Generate strong, customizable random passwords with entropy strength estimation. 100% private in-browser crypto.",
      },
      { property: "og:title", content: "Password Generator | Flixo" },
      {
        property: "og:description",
        content: "Generate strong passwords with configurable length and character sets.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PasswordGeneratorPage,
});

function PasswordGeneratorPage() {
  const { t } = useI18n();

  return (
    <SiteLayout>
      <ToolLayout
        icon={KeyRound}
        name={t(toolNameKey("password-generator"))}
        description="Generate strong, secure passwords with custom character rules and strength evaluation."
        category={t(categoryNameKey("utilities"))}
      >
        <PasswordGenerator />
      </ToolLayout>
    </SiteLayout>
  );
}
