"use client";

import { useState, useMemo, useCallback } from "react";
import { Copy, Check, RefreshCw, Download, Tags, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

interface Keyword {
  word: string;
  count: number;
  score: number;
}

const STOP_WORDS = new Set([
  "the",
  "be",
  "to",
  "of",
  "and",
  "a",
  "in",
  "that",
  "have",
  "i",
  "it",
  "for",
  "not",
  "on",
  "with",
  "he",
  "as",
  "you",
  "do",
  "at",
  "this",
  "but",
  "his",
  "by",
  "from",
  "they",
  "we",
  "say",
  "her",
  "she",
  "or",
  "an",
  "will",
  "my",
  "one",
  "all",
  "would",
  "there",
  "their",
  "what",
  "so",
  "up",
  "out",
  "if",
  "about",
  "who",
  "get",
  "which",
  "go",
  "me",
  "when",
  "make",
  "can",
  "like",
  "time",
  "no",
  "just",
  "him",
  "know",
  "take",
  "people",
  "into",
  "year",
  "your",
  "good",
  "some",
  "could",
  "them",
  "see",
  "other",
  "than",
  "then",
  "now",
  "look",
  "only",
  "come",
  "its",
  "over",
  "think",
  "also",
  "back",
  "after",
  "use",
  "two",
  "how",
  "our",
  "work",
  "first",
  "well",
  "way",
  "even",
  "new",
  "want",
  "because",
  "any",
  "these",
  "give",
  "day",
  "most",
  "us",
  "is",
  "are",
  "was",
  "were",
  "been",
  "has",
  "had",
  "does",
  "did",
  "doing",
  "being",
  "having",
  "here",
  "very",
  "more",
  "such",
  "should",
  "those",
  "may",
  "might",
]);

export function KeywordExtractorTool() {
  const [input, setInput] = useState("");
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [copied, setCopied] = useState(false);
  const [minLength, setMinLength] = useState(3);
  const [maxKeywords, setMaxKeywords] = useState(20);
  const [includePhrases, setIncludePhrases] = useState(true);

  const extractKeywords = useCallback(() => {
    if (!input.trim()) {
      setKeywords([]);
      return;
    }

    // Tokenize and clean
    const words = input
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length >= minLength && !STOP_WORDS.has(w));

    // Count word frequencies
    const frequency: Record<string, number> = {};
    for (const word of words) {
      frequency[word] = (frequency[word] || 0) + 1;
    }

    // Calculate scores (simple TF with position bonus)
    const sentences = input.split(/[.!?]+/).filter((s) => s.trim());
    const wordScores: Record<string, number> = {};

    for (const [word, count] of Object.entries(frequency)) {
      // TF-IDF-like scoring
      const tf = count;
      const positionBonus = 1 + 1 / sentences.length; // Words in fewer sentences score higher
      const lengthBonus = word.length > 5 ? 1.2 : 1;
      wordScores[word] = tf * positionBonus * lengthBonus;
    }

    // Extract top keywords
    const scored = Object.entries(wordScores)
      .map(([word, score]) => ({
        word,
        count: frequency[word],
        score: Math.round(score * 100) / 100,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, maxKeywords);

    // Extract 2-word phrases
    if (includePhrases) {
      const phraseRegex = /\b(\w+)\s+(\w+)\b/gi;
      const phrases: Record<string, number> = {};
      let match;

      while ((match = phraseRegex.exec(input.toLowerCase())) !== null) {
        const w1 = match[1];
        const w2 = match[2];
        if (
          !STOP_WORDS.has(w1) &&
          !STOP_WORDS.has(w2) &&
          w1.length >= minLength &&
          w2.length >= minLength
        ) {
          const phrase = `${w1} ${w2}`;
          phrases[phrase] = (phrases[phrase] || 0) + 1;
        }
      }

      // Add top phrases
      const topPhrases = Object.entries(phrases)
        .filter(([, count]) => count >= 2)
        .sort((a, b) => b[1] - a[1])
        .slice(0, Math.floor(maxKeywords / 4))
        .map(([phrase, count]) => ({
          word: phrase,
          count,
          score: count * 1.5,
        }));

      // Merge and resort
      const all = [...scored, ...topPhrases]
        .sort((a, b) => b.score - a.score)
        .slice(0, maxKeywords);

      setKeywords(all);
    } else {
      setKeywords(scored);
    }
  }, [input, minLength, maxKeywords, includePhrases]);

  const handleCopy = async () => {
    const text = keywords.map((k) => `${k.word} (${k.count})`).join(", ");
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const text = keywords
      .map((k, i) => `${i + 1}. ${k.word} - Count: ${k.count}, Score: ${k.score}`)
      .join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "keywords.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setInput("");
    setKeywords([]);
  };

  const maxScore = keywords[0]?.score || 1;

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-1">
          <Label htmlFor="minLength" className="text-xs text-muted-foreground">
            Min word length
          </Label>
          <input
            id="minLength"
            type="number"
            min="2"
            max="10"
            value={minLength}
            onChange={(e) => setMinLength(Number(e.target.value))}
            className="w-full rounded-lg border border-border bg-background px-3 py-2"
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="maxKeywords" className="text-xs text-muted-foreground">
            Max keywords
          </Label>
          <input
            id="maxKeywords"
            type="number"
            min="5"
            max="100"
            value={maxKeywords}
            onChange={(e) => setMaxKeywords(Number(e.target.value))}
            className="w-full rounded-lg border border-border bg-background px-3 py-2"
          />
        </div>
        <div className="flex items-center pt-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includePhrases}
              onChange={(e) => setIncludePhrases(e.target.checked)}
              className="rounded border-border"
            />
            <span className="text-sm">Include 2-word phrases</span>
          </label>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Input Text
          </Label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your text, article, or content here to extract keywords..."
            className="w-full min-h-[200px] rounded-xl border border-border bg-background p-4 font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Extracted Keywords
            </Label>
            <span className="text-xs text-muted-foreground">{keywords.length} keywords</span>
          </div>
          <div className="min-h-[200px] rounded-xl border border-border bg-muted/30 p-4 overflow-y-auto">
            {keywords.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {keywords.map((kw, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1"
                  >
                    <span className="font-medium text-sm">{kw.word}</span>
                    <span className="text-xs text-muted-foreground">({kw.count})</span>
                    <div className="w-12 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${(kw.score / maxScore) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
                <Tags className="size-8 mb-2 opacity-40" />
                <span>Keywords will appear here</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        <Button onClick={extractKeywords} disabled={!input} size="sm">
          <Tags className="size-4 mr-2" />
          Extract Keywords
        </Button>
        {keywords.length > 0 && (
          <>
            <Button onClick={handleCopy} variant="outline" size="sm">
              {copied ? <Check className="size-4 mr-2" /> : <Copy className="size-4 mr-2" />}
              {copied ? "Copied!" : "Copy"}
            </Button>
            <Button onClick={handleDownload} variant="outline" size="sm">
              <Download className="size-4 mr-2" />
              Download
            </Button>
          </>
        )}
        <Button onClick={handleReset} variant="ghost" size="sm">
          <RefreshCw className="size-4 mr-2" />
          Reset
        </Button>
      </div>
    </div>
  );
}
