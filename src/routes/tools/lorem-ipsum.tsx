import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { LoremIpsumGenerator } from "@/components/tools/LoremIpsumGenerator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/lorem-ipsum")({
  head: () => ({
    meta: [
      { title: "Lorem Ipsum Generator — Generate Placeholder Text | Flixo" },
      { name: "description", content: "Generate lorem ipsum placeholder text instantly." },
      { property: "og:title", content: "Lorem Ipsum Generator | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: LoremIpsumPage,
});

function LoremIpsumPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        icon={FileText}
        name={t(toolNameKey("lorem-ipsum"))}
        description="Generate lorem ipsum placeholder text."
        category={t(categoryNameKey("utilities"))}
        slug="lorem-ipsum"
      >
        <LoremIpsumGenerator />
      </ToolLayout>
    </SiteLayout>
  );
}
