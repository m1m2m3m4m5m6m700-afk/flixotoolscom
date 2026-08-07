/**
 * Regex Tester Tool
 * Test and debug regular expressions
 */
import { Search } from "lucide-react";
import { useState } from "react";

export const regexTesterTool = {
  id: "regex-tester",
  slug: "regex-tester",
  name: "Regex Tester",
  description: "Test and debug regular expressions in real-time. See matches highlighted, capture groups, and common patterns.",
  icon: Search,
  category: "developer" as const,
  tags: ["regex", "regular", "expression", "test", "match", "pattern", "developer"],
  status: "ready" as const,
  runtime: function RegexTesterComponent() {
    const [pattern, setPattern] = useState("");
    const [flags, setFlags] = useState("g");
    const [testString, setTestString] = useState("");
    const [error, setError] = useState("");

    const { matches, groups } = (() => {
      if (!pattern || !testString) return { matches: [] as string[], groups: [] as string[][] };
      
      try {
        setError("");
        const regex = new RegExp(pattern, flags);
        const matches: string[] = [];
        const groups: string[][] = [];
        
        if (flags.includes("g")) {
          let match;
          while ((match = regex.exec(testString)) !== null) {
            matches.push(match[0]);
            groups.push(match.slice(1));
          }
        } else {
          const match = regex.exec(testString);
          if (match) {
            matches.push(match[0]);
            groups.push(match.slice(1));
          }
        }
        
        return { matches, groups };
      } catch (e) {
        setError((e as Error).message);
        return { matches: [], groups: [] };
      }
    })();

    const highlightedText = testString.replace(new RegExp(pattern || " ", flags.includes("g") ? flags : flags + "g"), (match) => `【${match}】`);

    return (
      <div className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">Regular Expression</label>
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-1 px-4 py-2 rounded-xl border bg-background font-mono"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Enter regex pattern..."
            />
            <input
              type="text"
              className="w-20 px-3 py-2 rounded-xl border bg-muted font-mono text-center"
              value={flags}
              onChange={(e) => setFlags(e.target.value.replace(/[^gimsuy]/g, ""))}
              placeholder="g"
              maxLength={6}
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Test String</label>
          <textarea
            className="w-full px-4 py-3 rounded-xl border bg-background min-h-[150px] font-mono text-sm"
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder="Enter text to test against..."
          />
        </div>

        {matches.length > 0 && (
          <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl space-y-2">
            <p className="font-medium text-green-600">✅ {matches.length} match{matches.length !== 1 ? "es" : ""} found</p>
            <div className="space-y-1">
              {matches.slice(0, 10).map((match, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <span className="bg-green-500/20 px-2 py-0.5 rounded font-mono">{match}</span>
                  {groups[i]?.length > 0 && (
                    <span className="text-xs text-muted-foreground">
                      Groups: [{groups[i].join(", ")}]
                    </span>
                  )}
                </div>
              ))}
              {matches.length > 10 && (
                <p className="text-xs text-muted-foreground">...and {matches.length - 10} more</p>
              )}
            </div>
          </div>
        )}

        {testString && !error && matches.length === 0 && pattern && (
          <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
            <p className="text-yellow-600">⚠️ No matches found</p>
          </div>
        )}

        {testString && pattern && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Highlighted Preview</label>
            <div className="p-4 bg-muted/50 rounded-xl font-mono text-sm whitespace-pre-wrap">
              {highlightedText.split("【").map((part, i) => 
                i % 2 === 0 ? part : <mark key={i} className="bg-yellow-300 text-black rounded px-0.5">{part}</mark>
              )}
            </div>
          </div>
        )}
      </div>
    );
  },
};

export default regexTesterTool;
