import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Check } from "lucide-react";

const MORSE_CODE: Record<string, string> = {
  a: ".-",
  b: "-...",
  c: "-.-.",
  d: "-..",
  e: ".",
  f: "..-.",
  g: "--.",
  h: "....",
  i: "..",
  j: ".---",
  k: "-.-",
  l: ".-..",
  m: "--",
  n: "-.",
  o: "---",
  p: ".--.",
  q: "--.-",
  r: ".-.",
  s: "...",
  t: "-",
  u: "..-",
  v: "...-",
  w: ".--",
  x: "-..-",
  y: "-.--",
  z: "--..",
  0: "-----",
  1: ".----",
  2: "..---",
  3: "...--",
  4: "....-",
  5: ".....",
  6: "-....",
  7: "--...",
  8: "---..",
  9: "----.",
  " ": "/",
};

const REVERSE_MORSE = Object.fromEntries(Object.entries(MORSE_CODE).map(([k, v]) => [v, k]));

export function MorseCodeConverter() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);

  const textToMorse = (text: string) =>
    text
      .toLowerCase()
      .split("")
      .map((char) => MORSE_CODE[char] || char)
      .join(" ");

  const morseToText = (morse: string) =>
    morse
      .split(" ")
      .map((code) => REVERSE_MORSE[code] || code)
      .join("")
      .replace(/\/ /g, " ")
      .replace(/\//g, " ");

  const isMorse = /^[.\\-\s]+$/.test(input);
  const output = isMorse ? morseToText(input) : textToMorse(input);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Enter Text or Morse Code
        </Label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[120px] w-full rounded-xl border border-border bg-background p-3 font-mono text-sm"
          placeholder="Enter text or morse code (e.g., HELLO or .... . .-.. .-.. ---)"
        />
      </div>

      <div className="rounded-lg bg-muted/50 p-3 text-center text-sm">
        <span className="text-muted-foreground">Mode: </span>
        <span className="font-medium">{isMorse ? "Morse → Text" : "Text → Morse"}</span>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {isMorse ? "Text Output" : "Morse Output"}
        </Label>
        <div className="min-h-[120px] rounded-xl border border-border bg-muted/50 p-3 font-mono text-lg tracking-widest">
          {output || (
            <span className="text-muted-foreground text-sm tracking-normal">
              Output will appear here
            </span>
          )}
        </div>
      </div>

      <Button variant="outline" onClick={handleCopy} disabled={!output} className="w-full">
        {copied ? <Check className="size-4 mr-2" /> : <Copy className="size-4 mr-2" />}
        {copied ? "Copied!" : "Copy Output"}
      </Button>
    </div>
  );
}
