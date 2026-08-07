import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Flag } from "lucide-react";

export function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((t) => t + 1);
      }, 10);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  const start = () => setIsRunning(true);
  const pause = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };
  const lap = () => {
    if (isRunning) {
      setLaps((prev) => [time, ...prev]);
    }
  };

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 6000);
    const seconds = Math.floor((ms % 6000) / 100);
    const centiseconds = ms % 100;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}.${centiseconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="rounded-3xl border border-primary/30 bg-primary/5 p-12 text-center">
        <p className="text-7xl font-mono font-bold text-primary tabular-nums">{formatTime(time)}</p>
      </div>

      <div className="flex gap-2">
        {!isRunning ? (
          <Button onClick={start} className="flex-1">
            <Play className="size-4 mr-2" />
            Start
          </Button>
        ) : (
          <Button onClick={pause} variant="outline" className="flex-1">
            <Pause className="size-4 mr-2" />
            Pause
          </Button>
        )}
        <Button onClick={lap} variant="outline" disabled={!isRunning} className="flex-1">
          <Flag className="size-4 mr-2" />
          Lap
        </Button>
        <Button onClick={reset} variant="outline" className="flex-1">
          <RotateCcw className="size-4 mr-2" />
          Reset
        </Button>
      </div>

      {laps.length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Lap Times
          </p>
          <div className="max-h-[200px] overflow-y-auto space-y-1">
            {laps.map((lapTime, i) => {
              const lapNumber = laps.length - i;
              const prevTime = laps[i - 1] || 0;
              const lapDuration = prevTime - lapTime;
              return (
                <div
                  key={i}
                  className="flex justify-between items-center rounded-lg border border-border/50 bg-surface/40 p-3 text-sm"
                >
                  <span className="text-muted-foreground">Lap {lapNumber}</span>
                  <span className="font-mono">{formatTime(lapTime)}</span>
                  <span className="font-mono text-primary text-xs">+{formatTime(lapDuration)}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
