import { useState, useMemo } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy, Check, BarChart3, Hash, Type, AlignLeft, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackCopyAction } from "@/lib/analytics";

export function WordCounter() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const stats = useMemo(() => {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).filter(Boolean) : [];
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s/g, "").length;
    const sentences = trimmed ? trimmed.split(/[.!?]+/).filter((s) => s.trim()).length : 0;
    const paragraphs = trimmed ? trimmed.split(/\n\n+/).filter((p) => p.trim()).length : 0;
    const lines = trimmed ? trimmed.split("\n").length : 0;
    const readingTime = Math.ceil(words.length / 200); // 200 words per minute
    const speakingTime = Math.ceil(words.length / 150); // 150 words per minute

    return {
      words: words.length,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs,
      lines,
      readingTime,
      speakingTime,
      avgWordLength: words.length > 0 ? (charactersNoSpaces / words.length).toFixed(1) : "0",
    };
  }, [text]);

  const handleCopy = async () => {
    const summary = `Words: ${stats.words}
Characters: ${stats.characters}
Characters (no spaces): ${stats.charactersNoSpaces}
Sentences: ${stats.sentences}
Paragraphs: ${stats.paragraphs}
Lines: ${stats.lines}
Reading time: ${stats.readingTime} min
Speaking time: ${stats.speakingTime} min`;

    try {
      await navigator.clipboard.writeText(summary);
      trackCopyAction("word-counter", summary.length, "word-counter");
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Ignore
    }
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-6">
      {/* Input */}
      <div>
        <Label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Enter your text
        </Label>
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start typing or paste your text here to count words, characters, sentences, and more..."
          className="min-h-[200px] rounded-xl"
        />
      </div>

      {/* Statistics Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<Type className="size-4" />}
          label="Words"
          value={stats.words.toLocaleString()}
          color="text-blue-500"
        />
        <StatCard
          icon={<Hash className="size-4" />}
          label="Characters"
          value={stats.characters.toLocaleString()}
          color="text-purple-500"
        />
        <StatCard
          icon={<AlignLeft className="size-4" />}
          label="Sentences"
          value={stats.sentences.toLocaleString()}
          color="text-green-500"
        />
        <StatCard
          icon={<BarChart3 className="size-4" />}
          label="Paragraphs"
          value={stats.paragraphs.toLocaleString()}
          color="text-amber-500"
        />
      </div>

      {/* Additional Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<Hash className="size-4" />}
          label="No Spaces"
          value={stats.charactersNoSpaces.toLocaleString()}
          color="text-muted-foreground"
          small
        />
        <StatCard
          icon={<Type className="size-4" />}
          label="Avg Word Length"
          value={stats.avgWordLength}
          color="text-muted-foreground"
          small
        />
        <StatCard
          icon={<Clock className="size-4" />}
          label="Reading Time"
          value={`${stats.readingTime} min`}
          color="text-emerald-500"
        />
        <StatCard
          icon={<Clock className="size-4" />}
          label="Speaking Time"
          value={`${stats.speakingTime} min`}
          color="text-cyan-500"
        />
      </div>

      {/* Copy Button */}
      <Button onClick={handleCopy} disabled={!text} variant="outline" className="w-full">
        {copied ? <Check className="mr-2 size-4" /> : <Copy className="mr-2 size-4" />}
        {copied ? "Copied to clipboard!" : "Copy Statistics"}
      </Button>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
  small = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
  small?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-surface/40 p-4">
      <span className={color}>{icon}</span>
      <div className="min-w-0 flex-1">
        <p className={`font-bold ${small ? "text-lg" : "text-2xl"} text-foreground`}>{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </div>
    </div>
  );
}
