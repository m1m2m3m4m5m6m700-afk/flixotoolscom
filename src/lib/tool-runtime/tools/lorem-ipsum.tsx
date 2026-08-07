/**
 * Lorem Ipsum Generator Tool
 * Generate placeholder text
 */
import { FileText } from "lucide-react";
import { createGeneratorTool } from "../engines/generator-tools";

const loremWords = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum"
];

const generateLorem = (paragraphs: number, sentencePerParagraph: number) => {
  const result: string[] = [];
  
  for (let p = 0; p < paragraphs; p++) {
    const sentences: string[] = [];
    for (let s = 0; s < sentencePerParagraph; s++) {
      const wordCount = Math.floor(Math.random() * 6) + 8;
      const words: string[] = [];
      for (let w = 0; w < wordCount; w++) {
        words.push(loremWords[Math.floor(Math.random() * loremWords.length)]);
      }
      const sentence = words.join(" ");
      sentences.push(sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".");
    }
    result.push(sentences.join(" "));
  }
  
  return result.join("\n\n");
};

export const loremIpsumTool = {
  id: "lorem-ipsum",
  slug: "lorem-ipsum",
  name: "Lorem Ipsum Generator",
  description: "Generate placeholder Lorem Ipsum text for design mockups, wireframes, and testing. Customize paragraph count and length.",
  icon: FileText,
  category: "developer" as const,
  tags: ["lorem", "ipsum", "placeholder", "dummy", "text", "generator", "design", "mockup"],
  status: "ready" as const,
  runtime: createGeneratorTool({
    id: "lorem-ipsum",
    name: "Lorem Ipsum Generator",
    description: "Generate placeholder text",
    icon: FileText,
    generate: (options) => {
      const paragraphs = (options.paragraphs as number) || 3;
      const sentences = (options.sentences as number) || 4;
      return generateLorem(paragraphs, sentences);
    },
    options: [
      { id: "paragraphs", label: "Paragraphs", type: "number", default: 3, min: 1, max: 20 },
      { id: "sentences", label: "Sentences per paragraph", type: "number", default: 4, min: 1, max: 20 },
    ],
  }),
};

export default loremIpsumTool;
