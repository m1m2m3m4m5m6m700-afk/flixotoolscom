import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Copy, Check, Download, RefreshCw, FileText, Type, AlignLeft } from "lucide-react";
import { trackCopyAction, trackDownloadAction } from "@/lib/analytics";

const LOREM_WORDS = [
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
  "autem",
  "vel",
  "eum",
  "iure",
  "reprehenderit",
  "qui",
  "in",
  "ea",
  "voluptate",
  "velit",
  "esse",
  "cillum",
  "fugiat",
  "nulla",
  "pariatur",
];

type OutputType = "words" | "sentences" | "paragraphs";

function generateLorem(count: number, type: OutputType): string {
  const words = LOREM_WORDS;

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  if (type === "words") {
    return Array.from({ length: count }, () => words[Math.floor(Math.random() * words.length)])
      .join(" ")
      .replace(/^./, (c) => c.toUpperCase());
  }

  if (type === "sentences") {
    const sentencesPerParagraph = 5;
    const wordsPerSentence = Math.max(8, Math.floor(count / sentencesPerParagraph));
    const sentences: string[] = [];

    for (let i = 0; i < count; i++) {
      const sentenceWords = Array.from(
        { length: wordsPerSentence },
        () => words[Math.floor(Math.random() * words.length)],
      );
      sentences.push(capitalize(sentenceWords.join(" ")) + ".");
    }

    return sentences.join(" ");
  }

  // paragraphs
  const wordsPerParagraph = Math.max(30, count);
  const sentencesPerParagraph = 5;
  const wordsPerSentence = Math.floor(wordsPerParagraph / sentencesPerParagraph);
  const paragraphs: string[] = [];

  for (let p = 0; p < count; p++) {
    const sentences: string[] = [];
    for (let s = 0; s < sentencesPerParagraph; s++) {
      const sentenceWords = Array.from(
        { length: wordsPerSentence },
        () => words[Math.floor(Math.random() * words.length)],
      );
      sentences.push(capitalize(sentenceWords.join(" ")) + ".");
    }
    paragraphs.push(sentences.join(" "));
  }

  return paragraphs.join("\n\n");
}

export function LoremIpsumGenerator() {
  const [count, setCount] = useState(3);
  const [type, setType] = useState<OutputType>("paragraphs");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = useCallback(() => {
    const result = generateLorem(count, type);
    setOutput(result);
  }, [count, type]);

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      trackCopyAction("lorem-ipsum", output.length, "lorem-ipsum");
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Ignore
    }
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "lorem-ipsum.txt";
    a.click();
    URL.revokeObjectURL(url);
    trackDownloadAction("lorem-ipsum.txt", "text/plain", "lorem-ipsum");
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-6">
      {/* Type Selector */}
      <div>
        <Label className="mb-3 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Output Type
        </Label>
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant={type === "words" ? "default" : "outline"}
            size="sm"
            onClick={() => setType("words")}
            className="flex flex-col items-center py-3 h-auto"
          >
            <Type className="mb-1 size-4" />
            <span className="text-xs">Words</span>
          </Button>
          <Button
            variant={type === "sentences" ? "default" : "outline"}
            size="sm"
            onClick={() => setType("sentences")}
            className="flex flex-col items-center py-3 h-auto"
          >
            <AlignLeft className="mb-1 size-4" />
            <span className="text-xs">Sentences</span>
          </Button>
          <Button
            variant={type === "paragraphs" ? "default" : "outline"}
            size="sm"
            onClick={() => setType("paragraphs")}
            className="flex flex-col items-center py-3 h-auto"
          >
            <FileText className="mb-1 size-4" />
            <span className="text-xs">Paragraphs</span>
          </Button>
        </div>
      </div>

      {/* Count Slider */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Number of {type}
          </Label>
          <span className="font-mono text-lg font-bold text-primary">{count}</span>
        </div>
        <Slider
          value={[count]}
          min={1}
          max={20}
          step={1}
          onValueChange={(val) => setCount(val[0])}
        />
        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
          <span>1</span>
          <span>20</span>
        </div>
      </div>

      {/* Generate Button */}
      <Button onClick={generate} className="w-full">
        <RefreshCw className="mr-2 size-4" />
        Generate {count} {type}
      </Button>

      {/* Output */}
      <div>
        <Label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Generated Text
        </Label>
        <Textarea
          value={output}
          readOnly
          placeholder="Click 'Generate' to create placeholder text..."
          className="min-h-[200px] rounded-xl"
        />
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={handleCopy}
          disabled={!output}
          variant="outline"
          className="flex-1 min-w-[100px]"
        >
          {copied ? <Check className="mr-2 size-4" /> : <Copy className="mr-2 size-4" />}
          {copied ? "Copied!" : "Copy"}
        </Button>
        <Button
          onClick={handleDownload}
          disabled={!output}
          variant="outline"
          className="flex-1 min-w-[100px]"
        >
          <Download className="mr-2 size-4" />
          Download
        </Button>
      </div>
    </div>
  );
}
