import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Play, Pause, RotateCcw } from "lucide-react";

export function CountdownTimer() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isRunning && remaining > 0) {
      interval = setInterval(() => {
        setRemaining((r) => {
          if (r <= 1) {
            setIsRunning(false);
            return 0;
          }
          return r - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, remaining]);

  const start = () => {
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    if (totalSeconds > 0) {
      setRemaining(totalSeconds);
      setIsRunning(true);
    }
  };

  const pause = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setRemaining(0);
  };

  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      {!isRunning && remaining === 0 ? (
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Hours
              </Label>
              <input
                type="number"
                min="0"
                max="99"
                value={hours}
                onChange={(e) => setHours(Math.max(0, Math.min(99, parseInt(e.target.value) || 0)))}
                className="w-full rounded-xl border border-border bg-background p-3 text-center font-mono text-2xl"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Minutes
              </Label>
              <input
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={(e) =>
                  setMinutes(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))
                }
                className="w-full rounded-xl border border-border bg-background p-3 text-center font-mono text-2xl"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Seconds
              </Label>
              <input
                type="number"
                min="0"
                max="59"
                value={seconds}
                onChange={(e) =>
                  setSeconds(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))
                }
                className="w-full rounded-xl border border-border bg-background p-3 text-center font-mono text-2xl"
              />
            </div>
          </div>
          <Button onClick={start} className="w-full">
            <Play className="size-4 mr-2" />
            Start Countdown
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-3xl border border-primary/30 bg-primary/5 p-12 text-center">
            <p className="text-7xl font-mono font-bold text-primary tabular-nums">
              {formatTime(remaining)}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={pause} className="flex-1">
              <Pause className="size-4 mr-2" />
              {isRunning ? "Pause" : "Resume"}
            </Button>
            <Button variant="outline" onClick={reset} className="flex-1">
              <RotateCcw className="size-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      )}

      {remaining === 0 && !isRunning && hours + minutes + seconds === 0 && (
        <p className="text-center text-sm text-muted-foreground">
          Set a time and click Start to begin
        </p>
      )}
    </div>
  );
}
