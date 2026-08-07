import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Check, Lock } from "lucide-react";

export function HashComparator() {
  const [hash1, setHash1] = useState("");
  const [hash2, setHash2] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  const normalizeHash = (hash: string) => hash.trim().toLowerCase();

  const hashesMatch = hash1 && hash2 && normalizeHash(hash1) === normalizeHash(hash2);
  const hashesMismatch = hash1 && hash2 && !hashesMatch;

  const getHashLength = (hash: string) => {
    const h = normalizeHash(hash);
    if (/^[a-f0-9]{32}$/i.test(h)) return "MD5 (32)";
    if (/^[a-f0-9]{40}$/i.test(h)) return "SHA-1 (40)";
    if (/^[a-f0-9]{64}$/i.test(h)) return "SHA-256 (64)";
    if (/^[a-f0-9]{128}$/i.test(h)) return "SHA-512 (128)";
    return "Unknown";
  };

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="rounded-xl border border-border bg-muted/30 p-4 flex items-center gap-3">
        <Lock className="size-5 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Compare two hash strings to verify if they match. Useful for verifying file integrity.
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            First Hash
          </Label>
          {hash1 && <span className="text-xs text-muted-foreground">{getHashLength(hash1)}</span>}
        </div>
        <textarea
          value={hash1}
          onChange={(e) => setHash1(e.target.value)}
          className="w-full rounded-xl border border-border bg-background p-3 font-mono text-sm min-h-[80px]"
          placeholder="Paste first hash here..."
        />
        {hash1 && (
          <Button variant="ghost" size="sm" onClick={() => handleCopy(hash1)} className="ml-auto">
            {copied === hash1 ? (
              <Check className="size-3 mr-1" />
            ) : (
              <Copy className="size-3 mr-1" />
            )}
            {copied === hash1 ? "Copied" : "Copy"}
          </Button>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Second Hash
          </Label>
          {hash2 && <span className="text-xs text-muted-foreground">{getHashLength(hash2)}</span>}
        </div>
        <textarea
          value={hash2}
          onChange={(e) => setHash2(e.target.value)}
          className="w-full rounded-xl border border-border bg-background p-3 font-mono text-sm min-h-[80px]"
          placeholder="Paste second hash here..."
        />
        {hash2 && (
          <Button variant="ghost" size="sm" onClick={() => handleCopy(hash2)} className="ml-auto">
            {copied === hash2 ? (
              <Check className="size-3 mr-1" />
            ) : (
              <Copy className="size-3 mr-1" />
            )}
            {copied === hash2 ? "Copied" : "Copy"}
          </Button>
        )}
      </div>

      {hash1 && hash2 && (
        <div
          className={`rounded-xl border p-6 text-center ${
            hashesMatch
              ? "border-emerald-500/30 bg-emerald-500/10"
              : "border-destructive/30 bg-destructive/10"
          }`}
        >
          {hashesMatch ? (
            <>
              <Check className="size-8 mx-auto mb-2 text-emerald-500" />
              <p className="text-lg font-semibold text-emerald-600">Hashes Match</p>
              <p className="text-sm text-muted-foreground mt-1">The hashes are identical</p>
            </>
          ) : (
            <>
              <Lock className="size-8 mx-auto mb-2 text-destructive" />
              <p className="text-lg font-semibold text-destructive">Hashes Do Not Match</p>
              <p className="text-sm text-muted-foreground mt-1">The hashes are different</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
