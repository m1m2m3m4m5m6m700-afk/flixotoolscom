/**
 * UUID Generator Tool
 * Generate various types of UUIDs
 */
import { Key } from "lucide-react";
import { useState, useCallback } from "react";
import { Copy, Check, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export const uuidGeneratorTool = {
  id: "uuid-generator",
  slug: "uuid-generator",
  name: "UUID Generator",
  description: "Generate UUIDs v1, v4, and v7. Perfect for database IDs, unique identifiers, and testing.",
  icon: Key,
  category: "developer" as const,
  tags: ["uuid", "guid", "generator", "unique", "id", "random", "developer"],
  status: "ready" as const,
  runtime: function UuidGeneratorComponent() {
    const [uuids, setUuids] = useState<string[]>([]);
    const [copied, setCopied] = useState<number | null>(null);
    const [version, setVersion] = useState<"v1" | "v4" | "v7">("v4");
    const [count, setCount] = useState(5);

    const generateUuid = useCallback((ver: "v1" | "v4" | "v7") => {
      const now = Date.now();
      const random = () => Math.floor(Math.random() * 0xffff);
      const randomMid = () => Math.floor(Math.random() * 0xffff);
      const randomLow = () => Math.floor(Math.random() * 0xffffffff);

      switch (ver) {
        case "v1":
          return `${randomMid().toString(16).padStart(4, "0")}${randomMid().toString(16).padStart(4, "0")}-${randomMid().toString(16).padStart(4, "0")}-${(randomMid() & 0x0fff | 0x1000).toString(16).padStart(4, "0")}-${(randomMid() & 0x3fff | 0x8000).toString(16).padStart(4, "0")}-${randomLow().toString(16).padStart(12, "0")}`;
        case "v4":
          return `${randomMid().toString(16).padStart(4, "0")}${randomMid().toString(16).padStart(4, "0")}-${(randomMid() & 0x0fff | 0x4000).toString(16).padStart(4, "0")}-${(randomMid() & 0x3fff | 0x8000).toString(16).padStart(4, "0")}-${randomMid().toString(16).padStart(4, "0")}${random().toString(16).padStart(4, "0")}-${randomLow().toString(16).padStart(12, "0")}`;
        case "v7":
          const timestamp = now;
          const base = Math.floor(timestamp).toString(16).padStart(12, "0");
          return `${base.slice(0, 8)}-${base.slice(8, 12)}-7${randomMid().toString(16).slice(0, 3)}-$(randomMid() & 0x3fff | 0x8000).toString(16).padStart(4, "0")-${randomLow().toString(16).padStart(12, "0")}`;
        default:
          return "";
      }
    }, []);

    const handleGenerate = useCallback(() => {
      const newUuids = Array.from({ length: count }, () => generateUuid(version));
      setUuids(newUuids);
    }, [count, version, generateUuid]);

    const handleCopy = useCallback(async (uuid: string, index: number) => {
      await navigator.clipboard.writeText(uuid);
      setCopied(index);
      setTimeout(() => setCopied(null), 2000);
    }, []);

    return (
      <div className="space-y-6">
        <div className="flex flex-wrap gap-4 p-4 bg-muted/50 rounded-lg">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">UUID Version</label>
            <select
              className="px-3 py-1.5 rounded-md border bg-background text-sm"
              value={version}
              onChange={(e) => setVersion(e.target.value as "v1" | "v4" | "v7")}
            >
              <option value="v1">v1 (Timestamp)</option>
              <option value="v4">v4 (Random)</option>
              <option value="v7">v7 (Unix Epoch)</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Count</label>
            <input
              type="number"
              min={1}
              max={100}
              className="px-3 py-1.5 rounded-md border bg-background text-sm w-20"
              value={count}
              onChange={(e) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
            />
          </div>
        </div>

        <Button onClick={handleGenerate} variant="default" size="sm">
          <RefreshCw className="size-4 mr-2" />
          Generate UUIDs
        </Button>

        {uuids.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Generated UUIDs</label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy(uuids.join("\n"), -1)}
              >
                {copied === -1 ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
                Copy All
              </Button>
            </div>
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {uuids.map((uuid, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <code className="flex-1 font-mono text-sm break-all">{uuid}</code>
                  <button
                    onClick={() => handleCopy(uuid, i)}
                    className="p-1.5 hover:bg-muted rounded-md transition-colors"
                  >
                    {copied === i ? (
                      <Check className="size-4 text-green-600" />
                    ) : (
                      <Copy className="size-4 text-muted-foreground" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  },
};

export default uuidGeneratorTool;
