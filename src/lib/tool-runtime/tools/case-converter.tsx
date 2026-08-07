/**
 * Case Converter Tool
 * Convert text between different case formats
 */
import { Type } from "lucide-react";
import { createTextTool } from "../engines/text-tools";

const processText = (input: string, options?: Record<string, unknown>) => {
  const caseType = options?.caseType as string || "lowercase";
  
  switch (caseType) {
    case "lowercase":
      return input.toLowerCase();
    case "uppercase":
      return input.toUpperCase();
    case "titlecase":
      return input.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    case "sentencecase":
      return input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
    case "camelcase":
      return input
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
    case "snakecase":
      return input
        .toLowerCase()
        .replace(/\s+/g, "_")
        .replace(/([a-z])([A-Z])/g, "$1_$2")
        .toLowerCase();
    case "kebabcase":
      return input
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/([a-z])([A-Z])/g, "$1-$2")
        .toLowerCase();
    case "constcase":
      return input
        .toUpperCase()
        .replace(/\s+/g, "_")
        .replace(/([a-z])([A-Z])/g, "$1_$2")
        .toUpperCase();
    case "pascalcase":
      return input
        .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
        .replace(/\s+/g, "");
    default:
      return input.toLowerCase();
  }
};

export const caseConverterTool = {
  id: "case-converter",
  slug: "case-converter",
  name: "Case Converter",
  description: "Convert text between different case formats: lowercase, UPPERCASE, Title Case, camelCase, snake_case, kebab-case, and more.",
  icon: Type,
  category: "utilities" as const,
  tags: ["text", "case", "convert", "format", "transform", "lowercase", "uppercase", "camelcase", "snakecase", "kebabcase"],
  status: "ready" as const,
  runtime: createTextTool({
    id: "case-converter",
    name: "Case Converter",
    description: "Convert text between different case formats",
    icon: Type,
    process: processText,
    options: [
      {
        id: "caseType",
        label: "Case Format",
        type: "select",
        options: ["lowercase", "uppercase", "titlecase", "sentencecase", "camelcase", "snakecase", "kebabcase", "constcase", "pascalcase"],
        default: "lowercase",
      },
    ],
    placeholder: "Enter text to convert...",
  }),
};

export default caseConverterTool;
