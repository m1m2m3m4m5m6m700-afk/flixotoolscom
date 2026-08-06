import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";
import { buildToolHeadMetadata } from "@/lib/seo/toolPageMetadata";
import type { ReadyToolRuntimeDefinition } from "./types";

export const createReadyToolHead = (definition: ReadyToolRuntimeDefinition) => () =>
  buildToolHeadMetadata(definition.slug, definition.seoOverride);

export function renderReadyToolPage(definition: ReadyToolRuntimeDefinition) {
  const ToolPage = () => {
    const { t } = useI18n();
    const ToolComponent = definition.component;
    const description = definition.layoutDescriptionKey
      ? t(definition.layoutDescriptionKey as never)
      : definition.layoutDescription;

    return (
      <SiteLayout>
        <ToolLayout
          icon={definition.icon}
          name={t(toolNameKey(definition.toolId))}
          description={description}
          category={t(categoryNameKey(definition.categoryId))}
          slug={definition.slug}
        >
          <ToolComponent />
        </ToolLayout>
      </SiteLayout>
    );
  };

  ToolPage.displayName = `${definition.toolId.replace(/(^|-)(\w)/g, (_, p1, p2) => p2.toUpperCase())}Page`;

  return ToolPage;
}
