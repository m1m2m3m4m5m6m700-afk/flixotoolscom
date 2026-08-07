import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Shuffle, Plus, Trash2, Sparkles } from "lucide-react";

export function RandomPicker() {
  const [items, setItems] = useState<string[]>(["Option 1", "Option 2", "Option 3"]);
  const [newItem, setNewItem] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const addItem = () => {
    if (newItem.trim() && !items.includes(newItem.trim())) {
      setItems([...items, newItem.trim()]);
      setNewItem("");
    }
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const spin = () => {
    if (items.length < 2) return;
    setIsSpinning(true);
    setSelected(null);

    let spins = 0;
    const maxSpins = 20;
    const interval = setInterval(() => {
      const randomItem = items[Math.floor(Math.random() * items.length)];
      setSelected(randomItem);
      spins++;

      if (spins >= maxSpins) {
        clearInterval(interval);
        setIsSpinning(false);
        // Final selection
        const finalItem = items[Math.floor(Math.random() * items.length)];
        setSelected(finalItem);
      }
    }, 100);
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Add Options
        </Label>
        <div className="flex gap-2">
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addItem()}
            className="flex-1 rounded-lg border border-border bg-background p-3"
            placeholder="Enter option..."
          />
          <Button onClick={addItem} variant="outline">
            <Plus className="size-4" />
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Options ({items.length})
        </Label>
        <div className="space-y-2">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-lg border border-border/50 bg-surface/40 p-3"
            >
              <span className="flex-1">{item}</span>
              <button
                onClick={() => removeItem(i)}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="size-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <Button onClick={spin} disabled={items.length < 2 || isSpinning} className="w-full">
        <Sparkles className="size-4 mr-2" />
        {isSpinning ? "Spinning..." : "Pick Random"}
      </Button>

      {selected && !isSpinning && (
        <div className="rounded-2xl border border-primary/30 bg-primary/5 p-8 text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Selected</p>
          <p className="text-3xl font-bold text-primary">{selected}</p>
        </div>
      )}

      {items.length < 2 && (
        <p className="text-center text-sm text-muted-foreground">
          Add at least 2 options to pick randomly
        </p>
      )}
    </div>
  );
}
