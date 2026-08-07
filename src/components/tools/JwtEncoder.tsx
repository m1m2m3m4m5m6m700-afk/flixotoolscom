import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Copy, Check } from "lucide-react";

export function JwtEncoder() {
  const [payload, setPayload] = useState(
    '{"sub": "1234567890","name": "John Doe","iat": 1516239022}',
  );
  const [secret, setSecret] = useState("your-secret-key");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const base64UrlEncode = (str: string) => {
    return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  };

  const generateToken = () => {
    try {
      const header = { alg: "HS256", typ: "JWT" };
      const headerEncoded = base64UrlEncode(JSON.stringify(header));
      const payloadEncoded = base64UrlEncode(payload);

      const data = `${headerEncoded}.${payloadEncoded}`;
      const signature = base64UrlEncode(btoa(secret + data));

      setToken(`${data}.${signature}`);
      setError("");
    } catch (e) {
      setError("Invalid JSON payload");
      setToken("");
    }
  };

  const decodeToken = () => {
    try {
      const parts = token.split(".");
      if (parts.length !== 3) throw new Error("Invalid JWT format");

      const header = JSON.parse(atob(parts[0].replace(/-/g, "+").replace(/_/g, "/")));
      const payloadDecoded = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));

      setPayload(JSON.stringify(payloadDecoded, null, 2));
      setError("");
    } catch (e) {
      setError("Invalid token format");
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(token);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          JWT Payload (JSON)
        </Label>
        <textarea
          value={payload}
          onChange={(e) => setPayload(e.target.value)}
          className="min-h-[150px] w-full rounded-xl border border-border bg-background p-3 font-mono text-sm"
          placeholder='{"key": "value"}'
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Secret Key
        </Label>
        <input
          type="text"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          className="w-full rounded-xl border border-border bg-background p-3 font-mono"
          placeholder="Enter secret key..."
        />
      </div>

      <div className="flex gap-2">
        <Button onClick={generateToken} className="flex-1">
          Generate Token
        </Button>
        <Button variant="outline" onClick={decodeToken} className="flex-1">
          Decode Token
        </Button>
      </div>

      {error && (
        <div className="rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {token && (
        <>
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Generated JWT
            </Label>
            <div className="rounded-xl border border-primary/30 bg-primary/5 p-3 break-all font-mono text-xs">
              {token}
            </div>
          </div>
          <Button variant="outline" onClick={handleCopy} className="w-full">
            {copied ? <Check className="size-4 mr-2" /> : <Copy className="size-4 mr-2" />}
            {copied ? "Copied!" : "Copy Token"}
          </Button>
        </>
      )}

      <div className="rounded-xl border border-border bg-muted/30 p-4 text-xs space-y-2">
        <p className="font-semibold uppercase tracking-wider">JWT Structure</p>
        <p className="font-mono">header.payload.signature</p>
        <p className="text-muted-foreground">
          This tool creates HS256 signed tokens. For production use, use proper JWT libraries with
          secure key management.
        </p>
      </div>
    </div>
  );
}
