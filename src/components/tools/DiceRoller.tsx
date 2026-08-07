import { useState } from "react";
import { Button } from "@/components/ui/button";

export function DiceRoller() {
  const [dice, setDice] = useState([6]);
  const [results, setResults] = useState<number[]>([]);
  const [rolling, setRolling] = useState(false);

  const roll = () => {
    setRolling(true);
    setTimeout(() => {
      const newResults = dice.map((sides) => Math.floor(Math.random() * sides) + 1);
      setResults(newResults);
      setRolling(false);
    }, 500);
  };

  const addDie = () => {
    if (dice.length < 10) {
      setDice([...dice, 6]);
    }
  };

  const removeDie = (index: number) => {
    if (dice.length > 1) {
      const newDice = dice.filter((_, i) => i !== index);
      setDice(newDice);
    }
  };

  const changeSides = (index: number, sides: number) => {
    const newDice = [...dice];
    newDice[index] = sides;
    setDice(newDice);
  };

  const total = results.reduce((sum, r) => sum + r, 0);

  const getDieFace = (sides: number, result: number) => {
    if (sides === 6) {
      const dotPositions: Record<number, number[][]> = {
        1: [[50, 50]],
        2: [
          [25, 25],
          [75, 75],
        ],
        3: [
          [25, 25],
          [50, 50],
          [75, 75],
        ],
        4: [
          [25, 25],
          [75, 25],
          [25, 75],
          [75, 75],
        ],
        5: [
          [25, 25],
          [75, 25],
          [50, 50],
          [25, 75],
          [75, 75],
        ],
        6: [
          [25, 25],
          [75, 25],
          [25, 50],
          [75, 50],
          [25, 75],
          [75, 75],
        ],
      };
      return dotPositions[result] || [];
    }
    return [];
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Dice Configuration
        </Label>
        <div className="space-y-2">
          {dice.map((sides, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground w-16">Die {i + 1}</span>
              <select
                value={sides}
                onChange={(e) => changeSides(i, Number(e.target.value))}
                className="flex-1 rounded-lg border border-border bg-background p-2"
              >
                {[4, 6, 8, 10, 12, 20].map((s) => (
                  <option key={s} value={s}>
                    D{s}
                  </option>
                ))}
              </select>
              {dice.length > 1 && (
                <button
                  onClick={() => removeDie(i)}
                  className="rounded-lg border border-destructive/30 px-2 py-1 text-xs text-destructive hover:bg-destructive/10"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
        {dice.length < 10 && (
          <button
            onClick={addDie}
            className="w-full rounded-lg border border-dashed border-border p-2 text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors"
          >
            + Add Die
          </button>
        )}
      </div>

      <div className="flex gap-2">
        <Button onClick={roll} disabled={rolling} className="flex-1">
          {rolling ? "Rolling..." : "Roll Dice"}
        </Button>
      </div>

      {results.length > 0 && (
        <>
          <div className="flex flex-wrap justify-center gap-4">
            {results.map((result, i) => (
              <div key={i} className="text-center">
                {dice[i] === 6 ? (
                  <div className="size-16 rounded-lg border-2 border-border bg-white relative">
                    {getDieFace(dice[i], result).map(([x, y], dotIndex) => (
                      <div
                        key={dotIndex}
                        className="absolute size-3 rounded-full bg-gray-800 -translate-x-1/2 -translate-y-1/2"
                        style={{ left: `${x}%`, top: `${y}%` }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="size-16 rounded-lg border-2 border-border bg-white flex items-center justify-center text-2xl font-bold">
                    {result}
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-1">D{dice[i]}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-primary/30 bg-primary/5 p-4 text-center">
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="text-3xl font-bold text-primary">{total}</p>
          </div>
        </>
      )}
    </div>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}
