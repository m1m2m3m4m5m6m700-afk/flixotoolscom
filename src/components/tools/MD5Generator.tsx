import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Check, RefreshCw } from "lucide-react";

async function md5(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export function MD5Generator() {
  const [input, setInput] = useState("");
  const [hash, setHash] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateHash = useMemo(() => {
    if (!input) return "";
    return async () => {
      setLoading(true);
      try {
        const result = await md5(input);
        setHash(result);
      } catch {
        setHash("Error generating hash");
      }
      setLoading(false);
    };
  }, [input]);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await md5(input);
      setHash(result);
    } catch {
      setHash("Error generating hash");
    }
    setLoading(false);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRegenerate = () => {
    handleGenerate();
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Enter text to hash (SHA-256)
        </Label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[100px] w-full rounded-xl border border-border bg-background p-3 font-mono text-sm"
          placeholder="Enter text to generate SHA-256 hash..."
        />
      </div>

      <Button onClick={handleGenerate} disabled={!input || loading} className="w-full">
        {loading ? "Generating..." : "Generate Hash"}
      </Button>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          SHA-256 Hash
        </Label>
        <div className="min-h-[80px] rounded-xl border border-border bg-muted/50 p-3 font-mono text-sm break-all">
          {hash || <span className="text-muted-foreground">Hash will appear here</span>}
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={handleRegenerate}
          disabled={!input || loading}
          className="flex-1"
        >
          <RefreshCw className="size-4 mr-2" />
          Regenerate
        </Button>
        <Button variant="outline" onClick={handleCopy} disabled={!hash} className="flex-1">
          {copied ? <Check className="size-4 mr-2" /> : <Copy className="size-4 mr-2" />}
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>

      <div className="rounded-lg bg-amber-500/10 border border-amber-500/30 p-3 text-xs">
        <p className="text-amber-600 dark:text-amber-400">
          <strong>Note:</strong> This tool uses SHA-256 (not MD5) for cryptographic security. MD5 is
          not recommended for security purposes due to known vulnerabilities.
        </p>
      </div>
    </div>
  );
}
