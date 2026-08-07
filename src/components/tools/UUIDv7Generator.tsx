import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Check, RefreshCw } from "lucide-react";

function generateUUIDv7(): string {
  const now = Date.now();
  const timestamp = now.toString(16).padStart(12, "0");
  const random = Array.from({ length: 12 }, () => Math.floor(Math.random() * 16).toString(16)).join(
    "",
  );
  return `${timestamp.slice(0, 8)}-${timestamp.slice(8, 12)}-${"7" + timestamp.slice(0, 3)}-${random.slice(0, 4)}-${random.slice(4)}`;
}

function generateUUIDv4(): string {
  return crypto.randomUUID();
}

export function UUIDv7Generator() {
  const [version, setVersion] = useState<"v4" | "v7">("v4");
  const [uuids, setUuids] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);

  const generate = () => {
    const count = 5;
    const newUuids = Array.from({ length: count }, () =>
      version === "v4" ? generateUUIDv4() : generateUUIDv7(),
    );
    setUuids(newUuids);
  };

  const handleCopy = async (uuid: string) => {
    await navigator.clipboard.writeText(uuid);
    setCopied(uuid);
    setTimeout(() => setCopied(null), 2000);
  };

  const copyAll = async () => {
    await navigator.clipboard.writeText(uuids.join("\n"));
    setCopied("all");
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => setVersion("v4")}
          className={`flex-1 rounded-lg border p-3 text-sm font-medium transition-colors ${
            version === "v4"
              ? "bg-primary text-primary-foreground"
              : "border-border hover:border-primary"
          }`}
        >
          UUID v4
          <span className="block text-xs opacity-70">Random</span>
        </button>
        <button
          onClick={() => setVersion("v7")}
          className={`flex-1 rounded-lg border p-3 text-sm font-medium transition-colors ${
            version === "v7"
              ? "bg-primary text-primary-foreground"
              : "border-border hover:border-primary"
          }`}
        >
          UUID v7
          <span className="block text-xs opacity-70">Timestamp-based</span>
        </button>
      </div>

      <div className="rounded-xl border border-border bg-muted/30 p-4 text-sm space-y-2">
        <p className="font-semibold">UUID Versions</p>
        <p>
          <strong>v4:</strong> Fully random UUID. Suitable for most use cases.
        </p>
        <p>
          <strong>v7:</strong> Timestamp-based UUID. Sortable by creation time, good for databases.
        </p>
      </div>

      <Button onClick={generate} className="w-full">
        <RefreshCw className="size-4 mr-2" />
        Generate UUIDs
      </Button>

      {uuids.length > 0 && (
        <>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Generated UUIDs
              </Label>
              <Button variant="ghost" size="sm" onClick={copyAll}>
                {copied === "all" ? (
                  <Check className="size-3 mr-1" />
                ) : (
                  <Copy className="size-3 mr-1" />
                )}
                {copied === "all" ? "Copied" : "Copy All"}
              </Button>
            </div>
            <div className="space-y-2">
              {uuids.map((uuid, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-border/50 bg-surface/40 p-3"
                >
                  <code className="font-mono text-sm">{uuid}</code>
                  <Button variant="ghost" size="sm" onClick={() => handleCopy(uuid)}>
                    {copied === uuid ? <Check className="size-4" /> : <Copy className="size-4" />}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
