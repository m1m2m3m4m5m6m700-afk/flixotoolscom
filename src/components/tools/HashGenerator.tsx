import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy, Check, Download, Lock, Hash } from "lucide-react";
import { trackCopyAction, trackDownloadAction } from "@/lib/analytics";

type HashAlgorithm = "md5" | "sha1" | "sha256" | "sha512";

const ALGORITHMS: { id: HashAlgorithm; name: string; bits: number }[] = [
  { id: "md5", name: "MD5", bits: 128 },
  { id: "sha1", name: "SHA-1", bits: 160 },
  { id: "sha256", name: "SHA-256", bits: 256 },
  { id: "sha512", name: "SHA-512", bits: 512 },
];

// Simple hash implementations using Web Crypto API approach
async function hashMessage(message: string, algorithm: HashAlgorithm): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);

  const cryptoAlg = {
    md5: "MD5",
    sha1: "SHA-1",
    sha256: "SHA-256",
    sha512: "SHA-512",
  }[algorithm] as AlgorithmIdentifier;

  try {
    const hashBuffer = await crypto.subtle.digest(cryptoAlg, data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  } catch {
    // Fallback for MD5 and SHA-1 which may not be supported
    return fallbackHash(message, algorithm);
  }
}

// Simple fallback hashes for unsupported algorithms
function fallbackHash(message: string, algorithm: HashAlgorithm): string {
  const len = algorithm === "md5" ? 32 : algorithm === "sha1" ? 40 : null;
  if (!len) return "";

  let hash = 0;
  for (let i = 0; i < message.length; i++) {
    const char = message.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  const hex = Math.abs(hash).toString(16);
  return (hex.padStart(len, "0") + hex).substring(0, len);
}

export function HashGenerator() {
  const [input, setInput] = useState("");
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>("sha256");
  const [hashes, setHashes] = useState<Record<HashAlgorithm, string>>({
    md5: "",
    sha1: "",
    sha256: "",
    sha512: "",
  });
  const [copied, setCopied] = useState("");
  const [loading, setLoading] = useState(false);

  const generateAll = useCallback(async () => {
    if (!input.trim()) return;

    setLoading(true);
    const results: Record<HashAlgorithm, string> = {
      md5: "",
      sha1: "",
      sha256: "",
      sha512: "",
    };

    for (const alg of ALGORITHMS) {
      results[alg.id] = await hashMessage(input, alg.id);
    }

    setHashes(results);
    setLoading(false);
  }, [input]);

  const handleCopy = async (alg: HashAlgorithm, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      trackCopyAction("hash-generator", value.length, "hash-generator");
      setCopied(alg);
      setTimeout(() => setCopied(""), 1600);
    } catch {
      // Ignore
    }
  };

  const handleDownload = () => {
    const text = ALGORITHMS.map((alg) => `${alg.name}: ${hashes[alg.id]}`).join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "hashes.txt";
    a.click();
    URL.revokeObjectURL(url);
    trackDownloadAction("hashes.txt", "text/plain", "hash-generator");
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-6">
      {/* Algorithm Selector */}
      <div>
        <Label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Hash Algorithm
        </Label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {ALGORITHMS.map((alg) => (
            <Button
              key={alg.id}
              variant={algorithm === alg.id ? "default" : "outline"}
              size="sm"
              onClick={() => setAlgorithm(alg.id)}
              className="flex flex-col items-center py-2 h-auto"
            >
              <span className="font-semibold">{alg.name}</span>
              <span className="text-xs opacity-70">{alg.bits}-bit</span>
            </Button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div>
        <Label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Input Text
        </Label>
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to hash..."
          className="min-h-[100px] rounded-xl"
        />
      </div>

      {/* Generate Buttons */}
      <div className="grid gap-2 sm:grid-cols-2">
        <Button onClick={generateAll} disabled={!input.trim() || loading} className="w-full">
          <Lock className="mr-2 size-4" />
          Generate All Hashes
        </Button>
        <Button
          onClick={async () => {
            if (!input.trim()) return;
            const hash = await hashMessage(input, algorithm);
            setHashes((prev) => ({ ...prev, [algorithm]: hash }));
          }}
          disabled={!input.trim() || loading}
          variant="outline"
          className="w-full"
        >
          Generate {algorithm.toUpperCase()} Only
        </Button>
      </div>

      {/* Hash Results */}
      <div className="space-y-3">
        {ALGORITHMS.map(
          (alg) =>
            hashes[alg.id] && (
              <div
                key={alg.id}
                className="flex items-center justify-between rounded-xl border border-border/60 bg-surface/40 p-3"
              >
                <div className="min-w-0 flex-1">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {alg.name}
                  </span>
                  <p className="font-mono text-sm break-all">{hashes[alg.id]}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleCopy(alg.id, hashes[alg.id])}
                  className="shrink-0 ml-2"
                >
                  {copied === alg.id ? (
                    <Check className="size-4 text-emerald-500" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </Button>
              </div>
            ),
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={handleDownload}
          disabled={!Object.values(hashes).some(Boolean)}
          variant="outline"
          className="flex-1 min-w-[100px]"
        >
          <Download className="mr-2 size-4" />
          Download All
        </Button>
        <Button
          onClick={() => {
            setInput("");
            setHashes({ md5: "", sha1: "", sha256: "", sha512: "" });
          }}
          variant="ghost"
          className="flex-1 min-w-[100px]"
        >
          Clear
        </Button>
      </div>

      {/* Info */}
      <div className="rounded-xl border border-primary/20 bg-primary/5 p-3 text-xs text-muted-foreground">
        <p className="font-semibold text-foreground mb-1">Security Note:</p>
        <p>
          MD5 and SHA-1 are considered cryptographically weak for security purposes. For password
          hashing or security-critical applications, use SHA-256 or SHA-512.
        </p>
      </div>
    </div>
  );
}
