import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Users, RefreshCw, Shuffle } from "lucide-react";

export function RandomTeamGenerator() {
  const [names, setNames] = useState("");
  const [teamCount, setTeamCount] = useState(2);
  const [teams, setTeams] = useState<string[][]>([]);

  const generate = () => {
    const nameList = names
      .split("\n")
      .map((n) => n.trim())
      .filter((n) => n);
    const shuffled = [...nameList].sort(() => Math.random() - 0.5);
    const result: string[][] = Array.from({ length: teamCount }, () => []);

    shuffled.forEach((name, i) => {
      result[i % teamCount].push(name);
    });

    setTeams(result);
  };

  const shuffleTeams = () => {
    generate();
  };

  const TEAM_COLORS = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-orange-500",
    "bg-pink-500",
    "bg-cyan-500",
    "bg-red-500",
    "bg-yellow-500",
  ];

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Names (one per line)
        </Label>
        <textarea
          value={names}
          onChange={(e) => setNames(e.target.value)}
          className="min-h-[150px] w-full rounded-xl border border-border bg-background p-3"
          placeholder="Alice&#10;Bob&#10;Charlie&#10;Diana&#10;Eve"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Number of Teams
        </Label>
        <div className="flex gap-2">
          {[2, 3, 4, 5, 6].map((n) => (
            <button
              key={n}
              onClick={() => setTeamCount(n)}
              className={`flex-1 rounded-lg border p-3 text-sm font-medium transition-colors ${
                teamCount === n
                  ? "bg-primary text-primary-foreground"
                  : "border-border hover:border-primary"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <Button onClick={generate} className="flex-1">
          <Users className="size-4 mr-2" />
          Generate Teams
        </Button>
        <Button variant="outline" onClick={shuffleTeams} disabled={teams.length === 0}>
          <Shuffle className="size-4 mr-2" />
          Shuffle
        </Button>
      </div>

      {teams.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {teams.map((team, i) => (
            <div key={i} className="rounded-xl border border-border overflow-hidden">
              <div
                className={`${TEAM_COLORS[i % TEAM_COLORS.length]} p-3 text-white font-semibold text-center`}
              >
                Team {i + 1}
              </div>
              <div className="p-3 space-y-1">
                {team.map((name, j) => (
                  <div key={j} className="flex items-center gap-2 text-sm">
                    <span className="w-6 h-6 rounded-full bg-muted flex items-center justify-center text-xs">
                      {j + 1}
                    </span>
                    {name}
                  </div>
                ))}
                {team.length === 0 && (
                  <p className="text-sm text-muted-foreground italic">No members</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {names && teams.length === 0 && (
        <p className="text-center text-sm text-muted-foreground">
          Click "Generate Teams" to create teams
        </p>
      )}
    </div>
  );
}
