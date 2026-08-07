import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Gift, Clock, Coffee, PartyPopper, GraduationCap, Briefcase } from "lucide-react";

export function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [targetDate, setTargetDate] = useState(new Date().toISOString().split("T")[0]);

  const result = useMemo(() => {
    if (!birthDate) return null;

    const birth = new Date(birthDate);
    const target = new Date(targetDate);

    if (isNaN(birth.getTime()) || isNaN(target.getTime())) return null;
    if (birth > target) return null;

    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((target.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    const totalSeconds = totalMinutes * 60;

    const nextBirthday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < target) {
      nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }
    const daysUntilBirthday = Math.ceil(
      (nextBirthday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24),
    );

    const lifeEvents = [
      {
        name: "100th Birthday",
        age: 100,
        date: new Date(birth.getFullYear() + 100, birth.getMonth(), birth.getDate()),
      },
      {
        name: "Retirement (65)",
        age: 65,
        date: new Date(birth.getFullYear() + 65, birth.getMonth(), birth.getDate()),
      },
      {
        name: "Full Retirement (67)",
        age: 67,
        date: new Date(birth.getFullYear() + 67, birth.getMonth(), birth.getDate()),
      },
      {
        name: "Driving License (16)",
        age: 16,
        date: new Date(birth.getFullYear() + 16, birth.getMonth(), birth.getDate()),
      },
      {
        name: "Voting Age (18)",
        age: 18,
        date: new Date(birth.getFullYear() + 18, birth.getMonth(), birth.getDate()),
      },
      {
        name: "Drinking Age (21)",
        age: 21,
        date: new Date(birth.getFullYear() + 21, birth.getMonth(), birth.getDate()),
      },
    ].filter((event) => event.date > target);

    return {
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      totalHours,
      totalMinutes,
      totalSeconds,
      daysUntilBirthday,
      lifeEvents,
    };
  }, [birthDate, targetDate]);

  const milestoneEmojis: Record<number, string> = {
    0: "🎂",
    1: "🧸",
    5: "🎈",
    10: "🎉",
    13: "📱",
    16: "🚗",
    18: "🗳️",
    21: "🍺",
    30: "💼",
    40: "👓",
    50: "🎯",
    60: "👴",
    65: "🏖️",
    70: "🎊",
    80: "👑",
    90: "🌟",
    100: "🎊",
  };

  const getMilestone = (years: number) => {
    const milestones = Object.keys(milestoneEmojis)
      .map(Number)
      .sort((a, b) => a - b);
    const passed = milestones.filter((m) => m <= years);
    const next = milestones.find((m) => m > years);
    return {
      passed: passed.length > 0 ? passed[passed.length - 1] : (null as number | null),
      next: next ?? (null as number | null),
    };
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-6">
      {/* Date Inputs */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Birth Date
          </Label>
          <Input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="h-12"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Calculate Age On
          </Label>
          <Input
            type="date"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="h-12"
          />
        </div>
      </div>

      {/* Result */}
      {result && (
        <>
          {/* Main Age Display */}
          <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-center">
            <p className="text-sm text-muted-foreground mb-2">Your Age</p>
            <p className="text-5xl font-bold font-mono text-primary">
              {result.years}
              <span className="text-2xl text-muted-foreground"> years</span>
            </p>
            <p className="text-lg text-muted-foreground mt-2">
              {result.months} months, {result.days} days
            </p>
          </div>

          {/* Milestone */}
          <div className="flex items-center justify-center gap-4 text-center">
            {getMilestone(result.years).next !== null && (
              <div className="rounded-lg border border-border/60 bg-surface/40 p-3">
                <p className="text-2xl mb-1">
                  {milestoneEmojis[getMilestone(result.years).next as number] || "🎂"}
                </p>
                <p className="text-xs text-muted-foreground">Next milestone</p>
                <p className="font-semibold">Age {getMilestone(result.years).next}</p>
              </div>
            )}
            <div className="rounded-lg border border-border/60 bg-surface/40 p-3">
              <p className="text-2xl mb-1">🎂</p>
              <p className="text-xs text-muted-foreground">Next birthday in</p>
              <p className="font-semibold">{result.daysUntilBirthday} days</p>
            </div>
          </div>

          {/* Detailed Stats */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon={<Clock className="size-4" />}
              label="Total Days"
              value={result.totalDays.toLocaleString()}
            />
            <StatCard
              icon={<Calendar className="size-4" />}
              label="Total Weeks"
              value={result.totalWeeks.toLocaleString()}
            />
            <StatCard
              icon={<Calendar className="size-4" />}
              label="Total Months"
              value={result.totalMonths.toLocaleString()}
            />
            <StatCard
              icon={<Clock className="size-4" />}
              label="Total Years"
              value={Math.floor(result.totalDays / 365).toLocaleString()}
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <StatCard
              icon={<Clock className="size-4" />}
              label="Total Hours"
              value={result.totalHours.toLocaleString()}
              small
            />
            <StatCard
              icon={<Clock className="size-4" />}
              label="Total Minutes"
              value={result.totalMinutes.toLocaleString()}
              small
            />
            <StatCard
              icon={<Clock className="size-4" />}
              label="Total Seconds"
              value={result.totalSeconds.toLocaleString()}
              small
            />
          </div>

          {/* Life Events */}
          {result.lifeEvents.length > 0 && (
            <div className="space-y-2">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Upcoming Life Events
              </Label>
              <div className="space-y-2">
                {result.lifeEvents.slice(0, 3).map((event, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-lg border border-border/60 bg-surface/40 p-3"
                  >
                    <div className="flex items-center gap-2">
                      <Calendar className="size-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{event.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {event.date.toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  small = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  small?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border/60 bg-surface/40 p-3">
      <span className="text-primary">{icon}</span>
      <div>
        <p className={`font-bold ${small ? "text-base" : "text-lg"}`}>{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}
