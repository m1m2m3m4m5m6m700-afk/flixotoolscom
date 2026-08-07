import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RefreshCw } from "lucide-react";

export function WordCloudGenerator() {
  const [text, setText] = useState("");
  const [wordCloud, setWordCloud] = useState<{ word: string; count: number; size: number }[]>([]);

  const generateWordCloud = () => {
    const words = text
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(/\s+/)
      .filter((w) => w.length > 2);

    const frequency: Record<string, number> = {};
    words.forEach((word) => {
      frequency[word] = (frequency[word] || 0) + 1;
    });

    const maxCount = Math.max(...Object.values(frequency), 1);
    const cloud = Object.entries(frequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 50)
      .map(([word, count]) => ({
        word,
        count,
        size: 0.8 + (count / maxCount) * 1.5,
      }));

    setWordCloud(cloud);
  };

  const colors = [
    "text-blue-500",
    "text-green-500",
    "text-purple-500",
    "text-pink-500",
    "text-orange-500",
    "text-cyan-500",
    "text-red-500",
    "text-yellow-500",
  ];

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Enter Text
        </Label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[150px] w-full rounded-xl border border-border bg-background p-3 text-sm"
          placeholder="Paste your text here to generate a word cloud..."
        />
      </div>

      <Button onClick={generateWordCloud} disabled={!text.trim()} className="w-full">
        <RefreshCw className="size-4 mr-2" />
        Generate Word Cloud
      </Button>

      {wordCloud.length > 0 && (
        <div className="min-h-[300px] rounded-xl border border-border bg-muted/30 p-6 flex flex-wrap items-center justify-center gap-4">
          {wordCloud.map(({ word, count, size }, i) => (
            <span
              key={word}
              className={`font-semibold ${colors[i % colors.length]} hover:underline cursor-default`}
              style={{ fontSize: `${size}rem` }}
              title={`${word}: ${count} occurrences`}
            >
              {word}
            </span>
          ))}
        </div>
      )}

      {wordCloud.length > 0 && (
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Top Words ({wordCloud.length} words)
          </Label>
          <div className="max-h-[200px] overflow-y-auto rounded-xl border border-border bg-muted/30 p-4 space-y-1">
            {wordCloud.slice(0, 20).map(({ word, count }) => (
              <div key={word} className="flex justify-between items-center text-sm">
                <span className="font-medium">{word}</span>
                <span className="text-muted-foreground">{count}x</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
