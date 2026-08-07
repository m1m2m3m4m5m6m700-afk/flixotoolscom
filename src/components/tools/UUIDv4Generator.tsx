import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Check, RefreshCw } from "lucide-react";

export function UUIDv4Generator() {
  const [uuids, setUuids] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [count, setCount] = useState(1);

  const generate = () => {
    const results: string[] = [];
    for (let i = 0; i < count; i++) {
      results.push(crypto.randomUUID());
    }
    setUuids(results);
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
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Number of UUIDs
        </Label>
        <div className="flex gap-2">
          {[1, 5, 10, 20].map((n) => (
            <button
              key={n}
              onClick={() => setCount(n)}
              className={`flex-1 rounded-lg border p-3 text-sm font-medium transition-colors ${
                count === n
                  ? "bg-primary text-primary-foreground"
                  : "border-border hover:border-primary"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
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
            <div className="space-y-2 max-h-[300px] overflow-y-auto">
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

          <div className="rounded-xl border border-border bg-muted/30 p-4 text-sm">
            <p className="font-semibold mb-2">UUID v4 Format:</p>
            <code className="block bg-muted p-2 rounded text-xs break-all">
              xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
            </code>
            <p className="mt-2 text-muted-foreground">122 bits of randomness, globally unique</p>
          </div>
        </>
      )}
    </div>
  );
}
