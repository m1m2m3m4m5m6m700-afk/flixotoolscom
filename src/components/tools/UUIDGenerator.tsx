import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Copy, Check, Download, RefreshCw, Hash } from "lucide-react";
import { trackCopyAction, trackDownloadAction } from "@/lib/analytics";

type UUIDVersion = "v4" | "v7";

function generateUUIDv4(): string {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function generateUUIDv7(): string {
  const timestamp = Date.now();
  const timestampHex = timestamp.toString(16).padStart(12, "0");
  const randomBytes = new Uint8Array(10);
  crypto.getRandomValues(randomBytes);
  const randomHex = Array.from(randomBytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  const uuid = `${timestampHex.slice(0, 8)}-${timestampHex.slice(8, 12)}-7${randomHex.slice(0, 3)}-${((parseInt(randomHex.slice(3, 5), 16) & 0x3f) | 0x80).toString(16).padStart(2, "0")}${randomHex.slice(5, 10)}-${randomHex.slice(10)}`;
  return uuid;
}

export function UUIDGenerator() {
  const [uuids, setUuids] = useState<string[]>([generateUUIDv4()]);
  const [count, setCount] = useState(1);
  const [version, setVersion] = useState<UUIDVersion>("v4");
  const [copied, setCopied] = useState(false);
  const [uppercase, setUppercase] = useState(false);

  const generate = useCallback(() => {
    const generator = version === "v4" ? generateUUIDv4 : generateUUIDv7;
    const newUuids = Array.from({ length: count }, () => generator());
    setUuids(uppercase ? newUuids.map((u) => u.toUpperCase()) : newUuids);
  }, [count, version, uppercase]);

  const handleCopy = async () => {
    const text = uuids.join("\n");
    try {
      await navigator.clipboard.writeText(text);
      trackCopyAction("uuid-generator", text.length, "uuid-generator");
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Ignore
    }
  };

  const handleDownload = () => {
    const text = uuids.join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `uuids-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    trackDownloadAction(`uuids-${Date.now()}.txt`, "text/plain", "uuid-generator");
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-6">
      {/* Options */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            UUID Version
          </Label>
          <div className="flex gap-2">
            <Button
              variant={version === "v4" ? "default" : "outline"}
              size="sm"
              onClick={() => setVersion("v4")}
              className="flex-1"
            >
              v4 (Random)
            </Button>
            <Button
              variant={version === "v7" ? "default" : "outline"}
              size="sm"
              onClick={() => setVersion("v7")}
              className="flex-1"
            >
              v7 (Time-ordered)
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Number of UUIDs
            </Label>
            <span className="font-mono text-sm font-bold text-primary">{count}</span>
          </div>
          <Slider
            value={[count]}
            min={1}
            max={100}
            step={1}
            onValueChange={(val) => setCount(val[0])}
          />
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-border/60 bg-surface/40 p-3">
        <input
          type="checkbox"
          id="uppercase"
          checked={uppercase}
          onChange={(e) => setUppercase(e.target.checked)}
          className="size-4 rounded border-border"
        />
        <label htmlFor="uppercase" className="text-sm font-medium">
          UPPERCASE format
        </label>
      </div>

      {/* Generate Button */}
      <Button onClick={generate} className="w-full">
        <RefreshCw className="mr-2 size-4" />
        Generate {count} UUID{count > 1 ? "s" : ""}
      </Button>

      {/* Output */}
      <div>
        <Label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Generated UUID{count > 1 ? "s" : ""}
        </Label>
        <div className="rounded-xl border border-border bg-muted/30 p-4 font-mono text-sm space-y-2 max-h-[300px] overflow-y-auto">
          {uuids.map((uuid, i) => (
            <div key={i} className="flex items-center gap-2">
              <Hash className="size-3 text-muted-foreground shrink-0" />
              <span className="break-all">{uuid}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button onClick={handleCopy} disabled={!uuids.length} variant="outline" className="flex-1">
          {copied ? <Check className="mr-2 size-4" /> : <Copy className="mr-2 size-4" />}
          {copied ? "Copied!" : "Copy All"}
        </Button>
        <Button
          onClick={handleDownload}
          disabled={!uuids.length}
          variant="outline"
          className="flex-1"
        >
          <Download className="mr-2 size-4" />
          Download
        </Button>
      </div>
    </div>
  );
}
