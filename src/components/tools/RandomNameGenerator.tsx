import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Check, RefreshCw, Sparkles } from "lucide-react";

const FIRST_NAMES = [
  "Emma",
  "Liam",
  "Olivia",
  "Noah",
  "Ava",
  "Ethan",
  "Sophia",
  "Mason",
  "Isabella",
  "William",
  "Mia",
  "James",
  "Charlotte",
  "Benjamin",
  "Amelia",
  "Lucas",
  "Harper",
  "Henry",
  "Evelyn",
  "Alexander",
  "Luna",
  "Michael",
  "Camila",
  "Daniel",
  "Gianna",
  "Matthew",
  "Aria",
  "Sebastian",
  "Ella",
  "David",
  "Scarlett",
  "Joseph",
  "Penelope",
  "Samuel",
  "Riley",
  "Owen",
];

const LAST_NAMES = [
  "Smith",
  "Johnson",
  "Williams",
  "Brown",
  "Jones",
  "Garcia",
  "Miller",
  "Davis",
  "Rodriguez",
  "Martinez",
  "Hernandez",
  "Lopez",
  "Gonzalez",
  "Wilson",
  "Anderson",
  "Thomas",
  "Taylor",
  "Moore",
  "Jackson",
  "Martin",
  "Lee",
  "Perez",
  "Thompson",
  "White",
  "Harris",
  "Sanchez",
  "Clark",
  "Ramirez",
  "Lewis",
  "Robinson",
  "Walker",
  "Young",
  "Allen",
  "King",
];

export function RandomNameGenerator() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [fullName, setFullName] = useState("");
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const generate = () => {
    const first = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
    const last = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
    setFirstName(first);
    setLastName(last);
    const full = `${first} ${last}`;
    setFullName(full);
    setHistory((prev) => [full, ...prev.slice(0, 9)]);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(fullName);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="min-h-[60px] rounded-xl border border-border bg-muted/50 p-4 text-center font-medium text-lg">
        {fullName || (
          <span className="text-muted-foreground">Click generate for a random name</span>
        )}
      </div>

      <Button onClick={generate} className="w-full">
        <Sparkles className="size-4 mr-2" />
        Generate Random Name
      </Button>

      <div className="flex gap-2">
        <Button variant="outline" onClick={generate} className="flex-1">
          <RefreshCw className="size-4 mr-2" />
          New Name
        </Button>
        <Button variant="outline" onClick={handleCopy} disabled={!fullName} className="flex-1">
          {copied ? <Check className="size-4 mr-2" /> : <Copy className="size-4 mr-2" />}
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>

      {history.length > 1 && (
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Recent Names
          </Label>
          <div className="space-y-1">
            {history.slice(1, 6).map((name, i) => (
              <button
                key={i}
                onClick={() => setFullName(name)}
                className="w-full text-left px-3 py-2 rounded-lg border border-border/50 bg-background/50 text-sm hover:bg-muted/50 transition-colors"
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
