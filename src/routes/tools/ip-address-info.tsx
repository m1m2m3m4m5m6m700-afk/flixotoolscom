import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { IPAddressInfo } from "@/components/tools/IPAddressInfo";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/ip-address-info")({
  head: () => ({
    meta: [
      { title: "Ip Address Info — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online ip address info tool. Easy to use, no signup required.",
      },
    ],
  }),
  component: IPAddressInfoPage,
});

function IPAddressInfoPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("ip-address-info"))}
        description="Free online ip address info tool."
        category={t(categoryNameKey("utilities"))}
        slug="ip-address-info"
      >
        <IPAddressInfo />
      </ToolLayout>
    </SiteLayout>
  );
}
