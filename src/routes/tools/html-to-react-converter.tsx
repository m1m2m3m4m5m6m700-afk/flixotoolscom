import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { HTMLToReactConverter } from "@/components/tools/HTMLToReactConverter";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/html-to-react-converter")({
  head: () => ({
    meta: [
      { title: "Html To React Converter — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online html to react converter tool. Easy to use, no signup required.",
      },
    ],
  }),
  component: HTMLToReactConverterPage,
});

function HTMLToReactConverterPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("html-to-react-converter"))}
        description="Free online html to react converter tool."
        category={t(categoryNameKey("utilities"))}
        slug="html-to-react-converter"
      >
        <HTMLToReactConverter />
      </ToolLayout>
    </SiteLayout>
  );
}
