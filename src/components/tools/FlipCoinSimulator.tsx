import { useState } from "react";
import { Button } from "@/components/ui/button";

export function FlipCoinSimulator() {
  const [result, setResult] = useState<"heads" | "tails" | null>(null);
  const [flipping, setFlipping] = useState(false);
  const [history, setHistory] = useState<("heads" | "tails")[]>([]);
  const [counts, setCounts] = useState({ heads: 0, tails: 0 });

  const flip = () => {
    setFlipping(true);
    setResult(null);

    setTimeout(() => {
      const newResult = Math.random() < 0.5 ? "heads" : "tails";
      setResult(newResult);
      setFlipping(false);
      setHistory((prev) => [newResult, ...prev.slice(0, 99)]);
      setCounts((prev) => ({
        ...prev,
        [newResult]: prev[newResult] + 1,
      }));
    }, 1000);
  };

  const reset = () => {
    setResult(null);
    setHistory([]);
    setCounts({ heads: 0, tails: 0 });
  };

  const total = counts.heads + counts.tails;
  const headsPercent = total > 0 ? (counts.heads / total) * 100 : 50;

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="flex justify-center">
        <div
          className={`size-32 rounded-full border-4 flex items-center justify-center text-4xl font-bold transition-transform duration-300 ${
            flipping ? "animate-spin" : ""
          } ${
            result === "heads"
              ? "border-yellow-400 bg-yellow-100"
              : result === "tails"
                ? "border-gray-400 bg-gray-100"
                : "border-border bg-muted"
          }`}
        >
          {flipping ? "?" : result === "heads" ? "H" : result === "tails" ? "T" : "?"}
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={flip} disabled={flipping} className="flex-1">
          {flipping ? "Flipping..." : "Flip Coin"}
        </Button>
        <Button onClick={reset} variant="outline" className="flex-1">
          Reset
        </Button>
      </div>

      {total > 0 && (
        <>
          <div className="space-y-2">
            <div className="h-4 rounded-full bg-gray-200 overflow-hidden">
              <div
                className="h-full bg-yellow-400 transition-all"
                style={{ width: `${headsPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-sm">
              <span>
                Heads: {counts.heads} ({headsPercent.toFixed(1)}%)
              </span>
              <span>
                Tails: {counts.tails} ({(100 - headsPercent).toFixed(1)}%)
              </span>
            </div>
          </div>

          {history.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground text-center">
                Last {Math.min(history.length, 10)} flips
              </p>
              <div className="flex justify-center gap-1 flex-wrap">
                {history.slice(0, 20).map((r, i) => (
                  <span
                    key={i}
                    className={`size-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      r === "heads" ? "bg-yellow-400 text-yellow-900" : "bg-gray-400 text-white"
                    }`}
                  >
                    {r === "heads" ? "H" : "T"}
                  </span>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
