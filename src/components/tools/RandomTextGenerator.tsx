"use client";

import { useState, useCallback } from "react";
import { Copy, Check, RefreshCw, Download, Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const WORDS = [
  "lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "sed",
  "do",
  "eiusmod",
  "tempor",
  "incididunt",
  "ut",
  "labore",
  "et",
  "dolore",
  "magna",
  "aliqua",
  "enim",
  "ad",
  "minim",
  "veniam",
  "quis",
  "nostrud",
  "exercitation",
  "ullamco",
  "laboris",
  "nisi",
  "aliquip",
  "ex",
  "ea",
  "commodo",
  "consequat",
  "duis",
  "aute",
  "irure",
  "in",
  "reprehenderit",
  "voluptate",
  "velit",
  "esse",
  "cillum",
  "fugiat",
  "nulla",
  "pariatur",
  "excepteur",
  "sint",
  "occaecat",
  "cupidatat",
  "non",
  "proident",
  "sunt",
  "culpa",
  "qui",
  "officia",
  "deserunt",
  "mollit",
  "anim",
  "id",
  "est",
  "laborum",
  "curabitur",
  "pretium",
  "tincidunt",
  "lacus",
  "nec",
  "vitae",
  "bibendum",
  "eget",
  "lacinia",
  "nunc",
  "tortor",
  "pellentesque",
  "massa",
  "placerat",
  "duis",
  "ultricies",
  "vehicula",
  "rutrum",
  "tellus",
  "eget",
  "quam",
  "vestibulum",
  "ante",
  "ipsum",
  "primis",
  "faucibus",
  "orci",
  "luctus",
  "ultrices",
  "posuere",
  "cubilia",
  "curae",
  "maecenas",
  "fermentum",
  "turpis",
  "massa",
  "lobortis",
  "quam",
  "pellentesque",
  "habitant",
  "morbi",
  "tristique",
  "senectus",
  "netus",
  "malesuada",
  "famesac",
  "turpis",
  "egestas",
  "proin",
  "sagittis",
  "nisl",
  "rhoncus",
  "mattis",
  "nunc",
  "id",
  "ultricies",
  "diam",
  "maecenas",
  "ultricies",
  "mi",
  "quis",
  "hendrerit",
  "dolor",
  "gravida",
  "in",
  "vitae",
  "tortor",
  "placerat",
  "aliquam",
  "dictumst",
  "vestibulum",
  "rhoncus",
  "pellentesque",
  "tincidunt",
];

const SENTENCE_STARTS = [
  "The",
  "A",
  "This",
  "That",
  "These",
  "Those",
  "Some",
  "Many",
  "Several",
  "Most",
  "All",
  "Every",
  "Each",
  "Any",
  "No",
  "Not",
  "When",
  "Where",
  "Why",
  "How",
  "What",
  "Which",
  "If",
  "Then",
  "Because",
  "Although",
];

const ADJECTIVES = [
  "quick",
  "brown",
  "lazy",
  "smart",
  "bright",
  "dark",
  "light",
  "fast",
  "slow",
  "strong",
  "weak",
  "good",
  "great",
  "small",
  "large",
  "big",
  "tiny",
  "huge",
  "long",
  "short",
  "tall",
  "wide",
  "narrow",
  "deep",
  "shallow",
  "hot",
  "cold",
  "warm",
  "cool",
  "new",
  "old",
  "young",
];

const NOUNS = [
  "fox",
  "dog",
  "cat",
  "bird",
  "fish",
  "tree",
  "flower",
  "plant",
  "river",
  "mountain",
  "ocean",
  "forest",
  "desert",
  "city",
  "village",
  "house",
  "room",
  "door",
  "window",
  "table",
  "chair",
  "book",
  "page",
  "word",
  "sentence",
  "paragraph",
  "story",
  "poem",
  "song",
  "dance",
];

const VERBS = [
  "jumps",
  "runs",
  "walks",
  "flies",
  "swims",
  "climbs",
  "jumps",
  "sits",
  "stands",
  "moves",
  "turns",
  "stops",
  "starts",
  "works",
  "plays",
  "rests",
  "eats",
  "drinks",
  "sleeps",
  "wakes",
  "thinks",
  "dreams",
  "speaks",
  "writes",
  "reads",
  "listens",
  "watches",
  "looks",
  "sees",
  "hears",
  "feels",
  "knows",
];

const ADVERBS = [
  "quickly",
  "slowly",
  "brightly",
  "darkly",
  "loudly",
  "quietly",
  "softly",
  "hard",
  "well",
  "badly",
  "fast",
  "slow",
  "soon",
  "late",
  "now",
  "then",
  "here",
  "there",
  "everywhere",
  "nowhere",
  "always",
  "never",
  "often",
  "rarely",
];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateWord(): string {
  return randomItem(WORDS);
}

function generateSentence(minWords = 8, maxWords = 20): string {
  const wordCount = Math.floor(Math.random() * (maxWords - minWords + 1)) + minWords;
  const words: string[] = [randomItem(SENTENCE_STARTS)];

  for (let i = 1; i < wordCount; i++) {
    words.push(randomItem(WORDS));
  }

  // Ensure sentence ends properly
  const sentence = words.join(" ");
  return sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
}

function generateParagraph(minSentences = 3, maxSentences = 8): string {
  const sentenceCount =
    Math.floor(Math.random() * (maxSentences - minSentences + 1)) + minSentences;
  const sentences: string[] = [];

  for (let i = 0; i < sentenceCount; i++) {
    sentences.push(generateSentence());
  }

  return sentences.join(" ");
}

function generateRandomName(): string {
  const adjectives = ADJECTIVES;
  const nouns = NOUNS;
  return `${randomItem(adjectives).charAt(0).toUpperCase() + randomItem(adjectives).slice(1)} ${randomItem(nouns).charAt(0).toUpperCase() + randomItem(nouns).slice(1)}`;
}

export function RandomTextGenerator() {
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<"words" | "sentences" | "paragraphs" | "names" | "mixed">(
    "paragraphs",
  );
  const [count, setCount] = useState(3);

  const generate = useCallback(() => {
    let result: string[] = [];

    switch (mode) {
      case "words":
        result = Array.from({ length: count }, generateWord);
        break;
      case "sentences":
        result = Array.from({ length: count }, () => generateSentence());
        break;
      case "paragraphs":
        result = Array.from({ length: count }, () => generateParagraph());
        break;
      case "names":
        result = Array.from({ length: count }, generateRandomName);
        break;
      case "mixed":
        result = Array.from({ length: count }, () => {
          const type = Math.random();
          if (type < 0.2) return generateRandomName();
          if (type < 0.5) return generateSentence(5, 15);
          return generateParagraph(2, 5);
        });
        break;
    }

    setOutput(result.join(mode === "words" ? ", " : "\n\n"));
  }, [mode, count]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "random-text.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setOutput("");
    setCount(3);
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Type</Label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as typeof mode)}
            className="w-full rounded-lg border border-border bg-background px-3 py-2"
          >
            <option value="words">Words</option>
            <option value="sentences">Sentences</option>
            <option value="paragraphs">Paragraphs</option>
            <option value="names">Names</option>
            <option value="mixed">Mixed Content</option>
          </select>
        </div>
        <div className="space-y-1">
          <Label htmlFor="count" className="text-xs text-muted-foreground">
            Count
          </Label>
          <input
            id="count"
            type="number"
            min="1"
            max="50"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-full rounded-lg border border-border bg-background px-3 py-2"
          />
        </div>
        <div className="flex items-center pt-6">
          <Button onClick={generate} className="flex-1">
            <Shuffle className="size-4 mr-2" />
            Generate
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Generated Text
        </Label>
        <div className="min-h-[250px] rounded-xl border border-border bg-muted/30 p-4 font-mono text-sm overflow-y-auto whitespace-pre-wrap">
          {output || (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
              <Shuffle className="size-8 mb-2 opacity-40" />
              <span>Click Generate to create random text</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-center">
        {output && (
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
