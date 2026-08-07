import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Check, Shield } from "lucide-react";

export function EncDecText() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");
  const [key, setKey] = useState("key");
  const [copied, setCopied] = useState(false);

  const caesarCipher = (text: string, shift: number, decrypt: boolean) => {
    return text
      .split("")
      .map((char) => {
        if (char.match(/[a-z]/i)) {
          const base = char === char.toUpperCase() ? 65 : 97;
          const s = decrypt ? -shift : shift;
          return String.fromCharCode(((char.charCodeAt(0) - base + s + 26) % 26) + base);
        }
        return char;
      })
      .join("");
  };

  const rot13 = (text: string) => caesarCipher(text, 13, false);
  const rot13Decrypt = (text: string) => caesarCipher(text, 13, true);

  const handleEncrypt = () => {
    const shift = key.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % 26;
    setOutput(caesarCipher(input, shift, false));
  };

  const handleDecrypt = () => {
    const shift = key.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % 26;
    setOutput(caesarCipher(input, shift, true));
  };

  const handleRot13 = () => {
    setOutput(mode === "encrypt" ? rot13(input) : rot13Decrypt(input));
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="rounded-xl border border-border bg-muted/30 p-4 flex items-center gap-3">
        <Shield className="size-5 text-muted-foreground shrink-0" />
        <p className="text-sm text-muted-foreground">
          Caesar cipher encryption with customizable key. ROT13 is a special case where shift = 13.
        </p>
      </div>

      <div className="flex gap-2">
        {[
          { id: "encrypt", label: "Encrypt" },
          { id: "decrypt", label: "Decrypt" },
        ].map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setMode(id as typeof mode)}
            className={`flex-1 rounded-lg border p-2 text-sm font-medium transition-colors ${
              mode === id
                ? "bg-primary text-primary-foreground"
                : "border-border hover:border-primary"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Custom Key (for Caesar cipher)
        </Label>
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="w-full rounded-xl border border-border bg-background p-3"
          placeholder="Enter encryption key..."
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Input Text
        </Label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[100px] w-full rounded-xl border border-border bg-background p-3 font-mono text-sm"
          placeholder="Enter text to encrypt or decrypt..."
        />
      </div>

      <div className="flex gap-2">
        <Button onClick={mode === "encrypt" ? handleEncrypt : handleDecrypt} className="flex-1">
          {mode === "encrypt" ? "Encrypt" : "Decrypt"}
        </Button>
        <Button variant="outline" onClick={handleRot13} className="flex-1">
          ROT13
        </Button>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Output
        </Label>
        <div className="min-h-[100px] rounded-xl border border-primary/30 bg-primary/5 p-3 font-mono text-sm">
          {output || <span className="text-muted-foreground">Output will appear here</span>}
        </div>
      </div>

      <Button variant="outline" onClick={handleCopy} disabled={!output} className="w-full">
        {copied ? <Check className="size-4 mr-2" /> : <Copy className="size-4 mr-2" />}
        {copied ? "Copied!" : "Copy Output"}
      </Button>
    </div>
  );
}
