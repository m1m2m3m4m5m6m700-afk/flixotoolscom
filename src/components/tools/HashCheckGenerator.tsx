import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Check } from "lucide-react";

type HashType = "md5" | "sha1" | "sha256" | "sha512";

async function generateHash(text: string, type: HashType): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);

  if (type === "md5") {
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  }

  let algorithm: "SHA-1" | "SHA-256" | "SHA-512" = "SHA-256";
  if (type === "sha1") algorithm = "SHA-1";
  if (type === "sha512") algorithm = "SHA-512";

  const hashBuffer = await crypto.subtle.digest(algorithm, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function HashCheckGenerator() {
  const [text, setText] = useState("");
  const [hashes, setHashes] = useState<Record<HashType, string>>({
    md5: "",
    sha1: "",
    sha256: "",
    sha512: "",
  });
  const [copied, setCopied] = useState<HashType | null>(null);
  const [loading, setLoading] = useState(false);

  const generateAll = async () => {
    setLoading(true);
    try {
      const [md5, sha1, sha256, sha512] = await Promise.all([
        generateHash(text, "md5"),
        generateHash(text, "sha1"),
        generateHash(text, "sha256"),
        generateHash(text, "sha512"),
      ]);
      setHashes({ md5, sha1, sha256, sha512 });
    } catch {
      console.error("Error generating hashes");
    }
    setLoading(false);
  };

  const handleCopy = async (type: HashType, hash: string) => {
    await navigator.clipboard.writeText(hash);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Enter Text to Hash
        </Label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[100px] w-full rounded-xl border border-border bg-background p-3 font-mono text-sm"
          placeholder="Enter text to generate hash checksums..."
        />
      </div>

      <Button onClick={generateAll} disabled={!text || loading} className="w-full">
        {loading ? "Generating..." : "Generate Hashes"}
      </Button>

      <div className="space-y-3">
        {(["sha256", "sha512", "sha1", "md5"] as HashType[]).map((type) => (
          <div key={type} className="space-y-1">
            <div className="flex justify-between">
              <Label className="text-xs font-semibold uppercase text-muted-foreground">
                {type.toUpperCase()}
              </Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => hashes[type] && handleCopy(type, hashes[type])}
                disabled={!hashes[type]}
                className="h-auto p-0 text-xs"
              >
                {copied === type ? (
                  <Check className="size-3 mr-1" />
                ) : (
                  <Copy className="size-3 mr-1" />
                )}
                {copied === type ? "Copied" : "Copy"}
              </Button>
            </div>
            <div className="rounded-lg border border-border bg-muted/50 p-2 font-mono text-xs break-all">
              {hashes[type] || <span className="text-muted-foreground">Hash will appear here</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
