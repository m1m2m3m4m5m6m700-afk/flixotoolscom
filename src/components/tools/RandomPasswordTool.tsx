"use client";

import { useState, useCallback } from "react";
import { Copy, Check, RefreshCw, Download, Key, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function RandomPasswordTool() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const generate = useCallback(() => {
    let chars = "";
    if (includeUppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) chars += "0123456789";
    if (includeSymbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!chars) {
      chars = "abcdefghijklmnopqrstuvwxyz";
    }

    let newPassword = "";
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      newPassword += chars[array[i] % chars.length];
    }

    setPassword(newPassword);
    setHistory((prev) => [newPassword, ...prev.slice(0, 9)]);
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const content = history.join("\n");
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "passwords.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const getStrength = (pwd: string): { label: string; color: string } => {
    if (pwd.length < 8) return { label: "Very Weak", color: "text-red-500" };
    if (pwd.length < 12) return { label: "Weak", color: "text-orange-500" };

    let score = 0;
    if (/[a-z]/.test(pwd)) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^a-zA-Z0-9]/.test(pwd)) score++;

    if (score >= 3 && pwd.length >= 16) return { label: "Very Strong", color: "text-emerald-500" };
    if (score >= 2) return { label: "Strong", color: "text-emerald-500" };
    return { label: "Medium", color: "text-yellow-500" };
  };

  const strength = password ? getStrength(password) : null;

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="length"
              className="text-sm font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Password Length
            </Label>
            <span className="text-2xl font-bold text-primary">{length}</span>
          </div>
          <input
            id="length"
            type="range"
            min="4"
            max="64"
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>4</span>
            <span>64</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Include Characters
          </Label>
          <div className="grid gap-3 md:grid-cols-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
                className="rounded border-border"
              />
              <span className="text-sm">Uppercase (A-Z)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
                className="rounded border-border"
              />
              <span className="text-sm">Lowercase (a-z)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="rounded border-border"
              />
              <span className="text-sm">Numbers (0-9)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="rounded border-border"
              />
              <span className="text-sm">Symbols (!@#$...)</span>
            </label>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-muted/30 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Key className="size-6 text-primary" />
            <code className="text-xl font-mono break-all">{password || "Click generate..."}</code>
          </div>
          {strength && (
            <span className={`text-sm font-semibold ${strength.color}`}>{strength.label}</span>
          )}
        </div>

        <div className="divider" />

        <div className="flex gap-2">
          <Button onClick={generate} className="flex-1">
            <RefreshCw className="size-4 mr-2" />
            Generate
          </Button>
          <Button onClick={handleCopy} variant="outline" disabled={!password}>
            {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
          </Button>
        </div>
      </div>

      {history.length > 1 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Recent Passwords
            </Label>
            <Button onClick={handleDownload} variant="ghost" size="sm">
              <Download className="size-4 mr-2" />
              Download All
            </Button>
          </div>
          <div className="rounded-xl border border-border bg-muted/20 p-3 space-y-1">
            {history.slice(1).map((pwd, i) => (
              <div key={i} className="flex items-center justify-between">
                <code className="text-sm font-mono truncate flex-1">{pwd}</code>
                <button
                  onClick={() => navigator.clipboard.writeText(pwd)}
                  className="p-1 hover:bg-muted rounded"
                >
                  <Copy className="size-3 text-muted-foreground" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 flex items-center gap-3">
        <ShieldCheck className="size-5 text-emerald-500 shrink-0" />
        <p className="text-xs text-muted-foreground">
          Passwords are generated locally in your browser and never sent to any server.
        </p>
      </div>
    </div>
  );
}
