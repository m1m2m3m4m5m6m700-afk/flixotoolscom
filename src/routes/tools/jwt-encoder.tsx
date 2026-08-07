import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { JwtEncoder } from "@/components/tools/JwtEncoder";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/jwt-encoder")({
  head: () => ({
    meta: [
      {
        title: "Jwt Encoder — Free Online Tool | Flixo",
      },
      {
        name: "description",
        content: "Free online jwt encoder tool. Easy to use, no signup required.",
      },
    ],
  }),
  component: JwtEncoderPage,
});

function JwtEncoderPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("jwt-encoder"))}
        description="Free online jwt encoder tool."
        category={t(categoryNameKey("utilities"))}
        slug="jwt-encoder"
      >
        <JwtEncoder />
      </ToolLayout>
    </SiteLayout>
  );
}
