import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Check, X } from "lucide-react";

export function PasswordStrengthChecker() {
  const [password, setPassword] = useState("");

  const checks = [
    { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
    { label: "Uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
    { label: "Lowercase letter", test: (p: string) => /[a-z]/.test(p) },
    { label: "Number", test: (p: string) => /\d/.test(p) },
    { label: "Special character", test: (p: string) => /[!@#$%^&*(),.?":{}|<>]/.test(p) },
    {
      label: "No common passwords",
      test: (p: string) => !["password", "123456", "qwerty"].includes(p.toLowerCase()),
    },
  ];

  const getStrength = () => {
    const passed = checks.filter((c) => c.test(password)).length;
    if (password.length === 0) return { level: 0, label: "", color: "" };
    if (passed <= 2) return { level: 1, label: "Weak", color: "bg-red-500" };
    if (passed <= 4) return { level: 2, label: "Medium", color: "bg-yellow-500" };
    return { level: 3, label: "Strong", color: "bg-emerald-500" };
  };

  const strength = getStrength();

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Enter Password
        </Label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-border bg-background p-4 font-mono text-lg"
          placeholder="Enter password to check..."
        />
      </div>

      {password && (
        <>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-semibold">Strength: {strength.label}</span>
              <span>
                {checks.filter((c) => c.test(password)).length}/{checks.length}
              </span>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3].map((level) => (
                <div
                  key={level}
                  className={`h-2 flex-1 rounded-full transition-colors ${
                    level <= strength.level ? strength.color : "bg-muted"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            {checks.map((check, i) => {
              const passed = check.test(password);
              return (
                <div key={i} className="flex items-center gap-3 text-sm">
                  {passed ? (
                    <Check className="size-4 text-emerald-500" />
                  ) : (
                    <X className="size-4 text-muted-foreground" />
                  )}
                  <span className={passed ? "text-emerald-600" : "text-muted-foreground"}>
                    {check.label}
                  </span>
                </div>
              );
            })}
          </div>
        </>
      )}

      <div className="rounded-xl border border-border bg-muted/30 p-4 text-sm space-y-2">
        <p className="font-semibold">Tips for strong passwords:</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>Use 12+ characters minimum</li>
          <li>Mix uppercase, lowercase, numbers, and symbols</li>
          <li>Avoid personal information</li>
          <li>Use unique passwords for each account</li>
          <li>Consider using a password manager</li>
        </ul>
      </div>
    </div>
  );
}
