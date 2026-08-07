import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export function URLParser() {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const parsed = url
    ? (() => {
        try {
          const u = new URL(url);
          return {
            valid: true,
            protocol: u.protocol.replace(":", ""),
            host: u.hostname,
            port: u.port || "(default)",
            pathname: u.pathname,
            search: u.search,
            hash: u.hash,
            username: u.username,
            password: u.password ? "***" : "",
            origin: u.origin,
            params: Array.from(u.searchParams.entries()).map(([k, v]) => ({ key: k, value: v })),
          };
        } catch {
          return { valid: false };
        }
      })()
    : null;

  const handleCopy = async (key: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Enter URL
        </Label>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full rounded-xl border border-border bg-background p-3 font-mono text-sm"
          placeholder="https://example.com/path?param=value"
        />
      </div>

      {parsed && parsed.valid && (
        <div className="space-y-3">
          <UrlRow
            label="Protocol"
            value={parsed.protocol || ""}
            copyKey="protocol"
            onCopy={handleCopy}
            copied={copied}
          />
          <UrlRow
            label="Host"
            value={parsed.host || ""}
            copyKey="host"
            onCopy={handleCopy}
            copied={copied}
          />
          <UrlRow
            label="Port"
            value={parsed.port || ""}
            copyKey="port"
            onCopy={handleCopy}
            copied={copied}
          />
          <UrlRow
            label="Path"
            value={parsed.pathname || ""}
            copyKey="path"
            onCopy={handleCopy}
            copied={copied}
          />
          <UrlRow
            label="Origin"
            value={parsed.origin || ""}
            copyKey="origin"
            onCopy={handleCopy}
            copied={copied}
          />

          {parsed.params && parsed.params.length > 0 && (
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Query Parameters
              </Label>
              <div className="space-y-1">
                {parsed.params.map(({ key, value }, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg border border-border/50 bg-surface/40 p-2"
                  >
                    <span className="font-mono text-sm">
                      <span className="text-muted-foreground">{key}:</span> {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {parsed && !parsed.valid && (
        <div className="rounded-lg bg-destructive/10 border border-destructive/30 p-4 text-center text-destructive">
          Invalid URL format
        </div>
      )}
    </div>
  );
}

function UrlRow({
  label,
  value,
  copyKey,
  onCopy,
  copied,
}: {
  label: string;
  value: string;
  copyKey: string;
  onCopy: (key: string, value: string) => void;
  copied: string | null;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border/50 bg-surface/40 p-2">
      <span className="text-xs text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2">
        <span className="font-mono text-sm">{value}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onCopy(copyKey, value)}
          className="h-auto p-1"
        >
          {copied === copyKey ? <Check className="size-3" /> : <Copy className="size-3" />}
        </Button>
      </div>
    </div>
  );
}
