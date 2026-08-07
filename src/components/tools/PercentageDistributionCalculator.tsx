import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";

interface Item {
  name: string;
  value: number;
}

export function PercentageDistributionCalculator() {
  const [items, setItems] = useState<Item[]>([
    { name: "Category A", value: 100 },
    { name: "Category B", value: 200 },
    { name: "Category C", value: 150 },
  ]);
  const [showPercentage, setShowPercentage] = useState(true);

  const total = items.reduce((sum, item) => sum + item.value, 0);

  const addItem = () => {
    setItems([...items, { name: `Category ${String.fromCharCode(65 + items.length)}`, value: 0 }]);
  };

  const removeItem = (index: number) => {
    if (items.length > 2) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  const updateItem = (index: number, field: keyof Item, value: string | number) => {
    setItems(
      items.map((item, i) => {
        if (i === index) {
          return { ...item, [field]: field === "name" ? value : parseFloat(value as string) || 0 };
        }
        return item;
      }),
    );
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="flex justify-between items-center">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Values
        </Label>
        <div className="flex gap-2">
          <button
            onClick={() => setShowPercentage(false)}
            className={`rounded-lg border px-3 py-1 text-xs ${!showPercentage ? "bg-primary text-primary-foreground" : "border-border"}`}
          >
            Numbers
          </button>
          <button
            onClick={() => setShowPercentage(true)}
            className={`rounded-lg border px-3 py-1 text-xs ${showPercentage ? "bg-primary text-primary-foreground" : "border-border"}`}
          >
            Percentages
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item, i) => {
          const percentage = total > 0 ? (item.value / total) * 100 : 0;
          const displayValue = showPercentage ? percentage.toFixed(1) : item.value;

          return (
            <div key={i} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => updateItem(i, "name", e.target.value)}
                  className="flex-1 rounded-lg border border-border bg-background p-2"
                  placeholder="Category name"
                />
                <input
                  type="number"
                  value={item.value}
                  onChange={(e) => updateItem(i, "value", e.target.value)}
                  className="w-24 rounded-lg border border-border bg-background p-2 text-right font-mono"
                />
                <button
                  onClick={() => removeItem(i)}
                  disabled={items.length <= 2}
                  className="rounded-lg border border-border p-2 text-destructive hover:bg-destructive/10 disabled:opacity-30"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
              <div className="h-3 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: `hsl(${(i * 60) % 360}, 70%, 50%)`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <Button variant="outline" onClick={addItem} className="w-full">
        <Plus className="size-4 mr-2" />
        Add Item
      </Button>

      <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-3">
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span className="font-mono">{total.toLocaleString()}</span>
        </div>
        <div className="grid gap-2">
          {items.map((item, i) => {
            const percentage = total > 0 ? (item.value / total) * 100 : 0;
            return (
              <div key={i} className="flex justify-between items-center text-sm">
                <span className="truncate flex-1">{item.name}</span>
                <span className="font-mono ml-2">
                  {percentage.toFixed(1)}% ({item.value})
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
