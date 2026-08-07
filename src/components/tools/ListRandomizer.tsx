import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Shuffle, Copy, Check } from "lucide-react";

export function ListRandomizer() {
  const [input, setInput] = useState("");
  const [shuffled, setShuffled] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const shuffle = () => {
    const items = input.split("\n").filter((item) => item.trim());
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    setShuffled(items);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shuffled.join("\n"));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pickRandom = () => {
    const items = input.split("\n").filter((item) => item.trim());
    if (items.length === 0) return;
    const randomItem = items[Math.floor(Math.random() * items.length)];
    setShuffled([randomItem]);
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Enter Items (one per line)
        </Label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[150px] w-full rounded-xl border border-border bg-background p-3 text-sm"
          placeholder="Enter items, one per line...
Apple
Banana
Cherry
Date"
        />
      </div>

      <div className="flex gap-2">
        <Button onClick={shuffle} disabled={!input.trim()} className="flex-1">
          <Shuffle className="size-4 mr-2" />
          Shuffle All
        </Button>
        <Button onClick={pickRandom} disabled={!input.trim()} className="flex-1">
          Pick Random
        </Button>
      </div>

      {shuffled.length > 0 && (
        <>
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {shuffled.length === 1 ? "Random Selection" : `Shuffled (${shuffled.length} items)`}
            </Label>
            <div className="space-y-1">
              {shuffled.map((item, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-border/50 bg-surface/40 p-2 text-center font-medium"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <Button variant="outline" onClick={handleCopy} className="w-full">
            {copied ? <Check className="size-4 mr-2" /> : <Copy className="size-4 mr-2" />}
            {copied ? "Copied!" : "Copy Results"}
          </Button>
        </>
      )}
    </div>
  );
}
