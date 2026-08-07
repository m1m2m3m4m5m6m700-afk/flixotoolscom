import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { PasswordStrengthTester } from "@/components/tools/PasswordStrengthTester";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/password-strength-tester")({
  head: () => ({
    meta: [
      { title: "Password Strength Tester — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online password strength tester tool. Easy to use, no signup required.",
      },
      { property: "og:title", content: "Password Strength Tester | Flixo" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: PasswordStrengthTesterPage,
});

function PasswordStrengthTesterPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("password-strength-tester"))}
        description="Free online password strength tester tool."
        category={t(categoryNameKey("utilities"))}
        slug="password-strength-tester"
      >
        <PasswordStrengthTester />
      </ToolLayout>
    </SiteLayout>
  );
}
