import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { EmailExtractorTool } from "@/components/tools/EmailExtractorTool";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/email-extractor")({
  head: () => ({
    meta: [
      { title: "Email Extractor — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Extract email addresses from any text. Free online email extractor tool.",
      },
      { property: "og:title", content: "Email Extractor | Flixo" },
    ],
  }),
  component: EmailExtractorPage,
});

function EmailExtractorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("email-extractor"))}
        description="Extract email addresses from text."
        category={t(categoryNameKey("utilities"))}
        slug="email-extractor"
      >
        <EmailExtractorTool />
      </ToolLayout>
    </SiteLayout>
  );
}
