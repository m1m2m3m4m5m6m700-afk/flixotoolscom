/**
 * Word Counter Tool
 * Count words, characters, sentences, and paragraphs
 */
import { Hash } from "lucide-react";
import { createTextTool } from "../engines/text-tools";

const processText = (input: string) => {
  const trimmed = input.trim();
  const words = trimmed ? trimmed.split(/\s+/).length : 0;
  const characters = input.length;
  const charactersNoSpaces = input.replace(/\s/g, "").length;
  const sentences = input.split(/[.!?]+/).filter(s => s.trim()).length;
  const paragraphs = input.split(/\n\n+/).filter(p => p.trim()).length;
  const lines = input.split("\n").length;
  const readingTime = Math.ceil(words / 200);
  
  return `Statistics for your text:

Words: ${words}
Characters (with spaces): ${characters}
Characters (no spaces): ${charactersNoSpaces}
Sentences: ${sentences}
Paragraphs: ${paragraphs}
Lines: ${lines}
Reading time: ${readingTime} min (200 wpm)`;
};

export const wordCounterTool = {
  id: "word-counter",
  slug: "word-counter",
  name: "Word Counter",
  description: "Count words, characters, sentences, paragraphs, and estimate reading time for any text.",
  icon: Hash,
  category: "utilities" as const,
  tags: ["text", "count", "words", "characters", "statistics", "analysis"],
  status: "ready" as const,
  runtime: createTextTool({
    id: "word-counter",
    name: "Word Counter",
    description: "Count words, characters, and more",
    icon: Hash,
    process: processText,
    placeholder: "Enter or paste your text here to count words...",
  }),
};

export default wordCounterTool;
