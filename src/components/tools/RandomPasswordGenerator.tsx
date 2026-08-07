import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Check, RefreshCw } from "lucide-react";
import { Slider } from "@/components/ui/slider";

export function RandomPasswordGenerator() {
  const [length, setLength] = useState([16]);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    let chars = "";
    if (options.lowercase) chars += "abcdefghijklmnopqrstuvwxyz";
    if (options.uppercase) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (options.numbers) chars += "0123456789";
    if (options.symbols) chars += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    if (!chars) {
      setPassword("Select at least one option");
      return;
    }

    const array = new Uint32Array(length[0]);
    crypto.getRandomValues(array);
    const result = Array.from(array)
      .map((x) => chars[x % chars.length])
      .join("");
    setPassword(result);
  }, [length, options]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Password Length
          </Label>
          <span className="text-sm font-medium">{length[0]}</span>
        </div>
        <Slider value={length} onValueChange={setLength} min={8} max={64} step={1} />
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Character Types
        </Label>
        <div className="grid grid-cols-2 gap-2">
          {[
            { key: "lowercase", label: "a-z" },
            { key: "uppercase", label: "A-Z" },
            { key: "numbers", label: "0-9" },
            { key: "symbols", label: "!@#$%" },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={options[key as keyof typeof options]}
                onChange={(e) => setOptions({ ...options, [key]: e.target.checked })}
                className="rounded border-border"
              />
              <span className="text-sm">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="min-h-[60px] rounded-xl border border-border bg-muted/50 p-4 text-center font-mono text-lg break-all">
        {password || (
          <span className="text-muted-foreground">Click generate to create password</span>
        )}
      </div>

      <div className="flex gap-2">
        <Button onClick={generate} className="flex-1">
          <RefreshCw className="size-4 mr-2" />
          Generate
        </Button>
        <Button variant="outline" onClick={handleCopy} disabled={!password} className="flex-1">
          {copied ? <Check className="size-4 mr-2" /> : <Copy className="size-4 mr-2" />}
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>
    </div>
  );
}
