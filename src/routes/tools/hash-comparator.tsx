import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { HashComparator } from "@/components/tools/HashComparator";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/hash-comparator")({
  head: () => ({
    meta: [
      { title: "Hash Comparator — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online hash comparator tool. Easy to use, no signup required.",
      },
    ],
  }),
  component: HashComparatorPage,
});

function HashComparatorPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("hash-comparator"))}
        description="Free online hash comparator tool."
        category={t(categoryNameKey("utilities"))}
        slug="hash-comparator"
      >
        <HashComparator />
      </ToolLayout>
    </SiteLayout>
  );
}
