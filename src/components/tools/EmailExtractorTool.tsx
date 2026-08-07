"use client";

import { useState, useMemo } from "react";
import { Copy, Check, RefreshCw, Download, Mail, AtSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function EmailExtractorTool() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [deduplicate, setDeduplicate] = useState(true);

  const emails = useMemo(() => {
    if (!input) return [];

    // Email regex pattern
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    const matches = input.match(emailRegex) || [];

    if (deduplicate) {
      return [...new Set(matches)];
    }
    return matches;
  }, [input, deduplicate]);

  const domainStats = useMemo(() => {
    const domains: Record<string, number> = {};
    emails.forEach((email) => {
      const domain = email.split("@")[1]?.toLowerCase();
      if (domain) {
        domains[domain] = (domains[domain] || 0) + 1;
      }
    });
    return Object.entries(domains)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
  }, [emails]);

  const handleCopy = async () => {
    const text = emails.join("\n");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const text = emails.join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "extracted-emails.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadCSV = () => {
    const csv = ["Email", ...emails].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "extracted-emails.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setInput("");
  };

  const handleSample = () => {
    setInput(`Contact us at:
- John Smith: john.smith@company.com
- Sales: sales@example.org
- Support: support@techfirm.io

You can also reach:
  Jane Doe (jane.doe@startup.co)
  Bob Wilson (bob@test-domain.net)

Invalid emails (should not be extracted):
- notanemail
- missing@domain
- @nodomain.com
- spaces in@email.com`);
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Input Text
        </Label>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={deduplicate}
              onChange={(e) => setDeduplicate(e.target.checked)}
              className="rounded border-border"
            />
            <span className="text-sm">Remove duplicates</span>
          </label>
          <Button onClick={handleSample} variant="ghost" size="sm">
            Try Sample
          </Button>
        </div>
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Paste your text here to extract email addresses..."
        className="w-full min-h-[150px] rounded-xl border border-border bg-background p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
      />

      {emails.length > 0 && (
        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2 space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Extracted Emails ({emails.length})
              </Label>
              <div className="flex gap-2">
                <Button onClick={handleCopy} variant="outline" size="sm">
                  {copied ? <Check className="size-4 mr-2" /> : <Copy className="size-4 mr-2" />}
                  {copied ? "Copied!" : "Copy All"}
                </Button>
                <Button onClick={handleDownload} variant="outline" size="sm">
                  <Download className="size-4 mr-2" />
                  TXT
                </Button>
                <Button onClick={handleDownloadCSV} variant="outline" size="sm">
                  <Download className="size-4 mr-2" />
                  CSV
                </Button>
              </div>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-4 max-h-[200px] overflow-y-auto">
              {emails.map((email, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 py-1 border-b border-border/50 last:border-0"
                >
                  <AtSign className="size-4 text-muted-foreground shrink-0" />
                  <span className="font-mono text-sm">{email}</span>
                  <Button
                    onClick={() => navigator.clipboard.writeText(email)}
                    variant="ghost"
                    size="sm"
                    className="ml-auto shrink-0"
                  >
                    <Copy className="size-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {domainStats.length > 0 && (
            <div className="space-y-2">
              <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Top Domains
              </Label>
              <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-2">
                {domainStats.map(([domain, count]) => (
                  <div key={domain} className="flex items-center justify-between">
                    <span className="text-sm font-mono truncate">{domain}</span>
                    <span className="text-sm text-muted-foreground">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {input && emails.length === 0 && (
        <div className="rounded-xl border border-border bg-muted/30 p-8 text-center">
          <Mail className="size-12 mx-auto mb-4 text-muted-foreground opacity-40" />
          <p className="text-muted-foreground">No email addresses found</p>
        </div>
      )}

      <div className="flex justify-center">
        <Button onClick={handleReset} variant="ghost" size="sm">
          <RefreshCw className="size-4 mr-2" />
          Reset
        </Button>
      </div>
    </div>
  );
}
