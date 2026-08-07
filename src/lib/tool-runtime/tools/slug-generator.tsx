/**
 * Slug Generator Tool
 * Create URL-friendly slugs from text
 */
import { Link } from "lucide-react";
import { createTextTool } from "../engines/text-tools";

const processText = (input: string) => {
  const slug = input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
  
  return slug;
};

export const slugGeneratorTool = {
  id: "slug-generator",
  slug: "slug-generator",
  name: "Slug Generator",
  description: "Generate URL-friendly slugs from any text. Perfect for creating SEO-friendly URLs, file names, and identifiers.",
  icon: Link,
  category: "web" as const,
  tags: ["slug", "url", "permalink", "seo", "web", "link"],
  status: "ready" as const,
  runtime: createTextTool({
    id: "slug-generator",
    name: "Slug Generator",
    description: "Create URL-friendly slugs",
    icon: Link,
    process: processText,
    placeholder: "Enter title or text to generate a URL-friendly slug...",
  }),
};

export default slugGeneratorTool;
