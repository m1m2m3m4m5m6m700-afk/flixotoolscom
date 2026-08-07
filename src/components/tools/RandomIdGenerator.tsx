import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Check, RefreshCw } from "lucide-react";

type IDType = "uuid" | "nanoid" | "cuid" | "ulid";

export function RandomIdGenerator() {
  const [idType, setIdType] = useState<IDType>("uuid");
  const [ids, setIds] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [count, setCount] = useState(5);

  const generateId = (type: IDType): string => {
    switch (type) {
      case "uuid":
        return crypto.randomUUID();
      case "nanoid": {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        return Array.from(
          { length: 21 },
          () => chars[crypto.getRandomValues(new Uint8Array(1))[0] % chars.length],
        ).join("");
      }
      case "cuid": {
        const timestamp = Date.now().toString(36);
        const random = Array.from(
          { length: 24 },
          () =>
            "0123456789abcdefghijklmnopqrstuvwxyz"[
              crypto.getRandomValues(new Uint8Array(1))[0] % 36
            ],
        ).join("");
        return "c" + timestamp + random;
      }
      case "ulid": {
        const timePart = Date.now().toString(36).toUpperCase();
        const randPart = Array.from(
          { length: 10 },
          () =>
            "0123456789ABCDEFGHJKMNPQRSTVWXYZ"[crypto.getRandomValues(new Uint8Array(1))[0] % 32],
        ).join("");
        return (timePart + randPart).toUpperCase();
      }
      default:
        return crypto.randomUUID();
    }
  };

  const generate = () => {
    const newIds = Array.from({ length: count }, () => generateId(idType));
    setIds(newIds);
  };

  const handleCopy = async (id: string) => {
    await navigator.clipboard.writeText(id);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const copyAll = async () => {
    await navigator.clipboard.writeText(ids.join("\n"));
    setCopied("all");
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          ID Type
        </Label>
        <select
          value={idType}
          onChange={(e) => setIdType(e.target.value as IDType)}
          className="w-full rounded-xl border border-border bg-background p-3"
        >
          <option value="uuid">UUID v4</option>
          <option value="nanoid">Nano ID</option>
          <option value="cuid">CUID</option>
          <option value="ulid">ULID</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Number of IDs
        </Label>
        <select
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="w-full rounded-xl border border-border bg-background p-3"
        >
          {[1, 3, 5, 10, 20, 50].map((n) => (
            <option key={n} value={n}>
              {n} {n === 1 ? "ID" : "IDs"}
            </option>
          ))}
        </select>
      </div>

      <Button onClick={generate} className="w-full">
        <RefreshCw className="size-4 mr-2" />
        Generate IDs
      </Button>

      {ids.length > 0 && (
        <>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Generated IDs
              </Label>
              <Button variant="ghost" size="sm" onClick={copyAll}>
                {copied === "all" ? (
                  <Check className="size-3 mr-1" />
                ) : (
                  <Copy className="size-3 mr-1" />
                )}
                {copied === "all" ? "Copied All" : "Copy All"}
              </Button>
            </div>
            <div className="space-y-1 max-h-[200px] overflow-y-auto">
              {ids.map((id, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-border/50 bg-surface/40 p-2"
                >
                  <code className="font-mono text-sm">{id}</code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(id)}
                    className="h-auto p-1"
                  >
                    {copied === id ? <Check className="size-3" /> : <Copy className="size-3" />}
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
