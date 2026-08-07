/**
 * JSON Formatter Tool
 * Format, validate, and minify JSON
 */
import { Braces } from "lucide-react";
import { createTextTool } from "../engines/text-tools";

const processText = (input: string, options?: Record<string, unknown>) => {
  const action = options?.action as string || "format";
  
  try {
    const parsed = JSON.parse(input);
    
    if (action === "format") {
      return JSON.stringify(parsed, null, 2);
    } else if (action === "minify") {
      return JSON.stringify(parsed);
    } else if (action === "validate") {
      return "✅ Valid JSON\n\nParsed successfully!";
    }
    return JSON.stringify(parsed, null, 2);
  } catch (e) {
    throw new Error(`Invalid JSON: ${(e as Error).message}`);
  }
};

export const jsonFormatterTool = {
  id: "json-formatter",
  slug: "json-formatter",
  name: "JSON Formatter",
  description: "Format, validate, and minify JSON data. Beautify messy JSON or compress clean JSON for production.",
  icon: Braces,
  category: "developer" as const,
  tags: ["json", "format", "beautify", "minify", "validate", "developer"],
  status: "ready" as const,
  runtime: createTextTool({
    id: "json-formatter",
    name: "JSON Formatter",
    description: "Format, validate, and minify JSON",
    icon: Braces,
    process: processText,
    options: [
      {
        id: "action",
        label: "Action",
        type: "select",
        options: ["format", "minify", "validate"],
        default: "format",
      },
    ],
    placeholder: '{\n  "name": "John",\n  "age": 30,\n  "city": "New York"\n}',
  }),
};

export default jsonFormatterTool;
