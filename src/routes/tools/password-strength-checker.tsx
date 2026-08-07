import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/layout/SiteLayout";
import { ToolLayout } from "@/components/tools/ToolLayout";
import { PasswordStrengthChecker } from "@/components/tools/PasswordStrengthChecker";
import { useI18n } from "@/lib/i18n";
import { categoryNameKey, toolNameKey } from "@/lib/i18n/keys";

export const Route = createFileRoute("/tools/password-strength-checker")({
  head: () => ({
    meta: [
      { title: "Password Strength Checker — Free Online Tool | Flixo" },
      {
        name: "description",
        content: "Free online password strength checker tool. Easy to use, no signup required.",
      },
    ],
  }),
  component: PasswordStrengthCheckerPage,
});

function PasswordStrengthCheckerPage() {
  const { t } = useI18n();
  return (
    <SiteLayout>
      <ToolLayout
        name={t(toolNameKey("password-strength-checker"))}
        description="Free online password strength checker tool."
        category={t(categoryNameKey("utilities"))}
        slug="password-strength-checker"
      >
        <PasswordStrengthChecker />
      </ToolLayout>
    </SiteLayout>
  );
}
