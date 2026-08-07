import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Check } from "lucide-react";

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
  "pellentesque",
  "habitant",
  "morbi",
  "tristique",
  "senectus",
  "netus",
  "malesuada",
  "fames",
  "turpis",
  "egestas",
];

function generateLoremIpsum(paragraphs: number, sentencesPerParagraph: number) {
  const result: string[] = [];

  for (let p = 0; p < paragraphs; p++) {
    const sentences: string[] = [];
    for (let s = 0; s < sentencesPerParagraph; s++) {
      const wordCount = Math.floor(Math.random() * 8) + 8;
      const words: string[] = [];
      for (let w = 0; w < wordCount; w++) {
        words.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
      }
      words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
      sentences.push(words.join(" ") + ".");
    }
    result.push(sentences.join(" "));
  }

  return result.join("\n\n");
}

export function LoremIpsumCustomizer() {
  const [paragraphs, setParagraphs] = useState(3);
  const [sentences, setSentences] = useState(5);
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    setText(generateLoremIpsum(paragraphs, sentences));
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Paragraphs
          </Label>
          <select
            value={paragraphs}
            onChange={(e) => setParagraphs(Number(e.target.value))}
            className="w-full rounded-xl border border-border bg-background p-3"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "paragraph" : "paragraphs"}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Sentences per Paragraph
          </Label>
          <select
            value={sentences}
            onChange={(e) => setSentences(Number(e.target.value))}
            className="w-full rounded-xl border border-border bg-background p-3"
          >
            {[3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "sentence" : "sentences"}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Button onClick={generate} className="w-full">
        Generate Lorem Ipsum
      </Button>

      {text && (
        <>
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Generated Text
            </Label>
            <div className="min-h-[200px] rounded-xl border border-border bg-muted/50 p-4 text-sm whitespace-pre-wrap">
              {text}
            </div>
          </div>

          <Button variant="outline" onClick={handleCopy} className="w-full">
            {copied ? <Check className="size-4 mr-2" /> : <Copy className="size-4 mr-2" />}
            {copied ? "Copied!" : "Copy to Clipboard"}
          </Button>
        </>
      )}
    </div>
  );
}
