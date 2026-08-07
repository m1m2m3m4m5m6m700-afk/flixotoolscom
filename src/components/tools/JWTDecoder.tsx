import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Copy, Check, AlertCircle, CheckCircle2, Lock, Shield } from "lucide-react";
import { trackCopyAction } from "@/lib/analytics";

interface JWTParts {
  header: Record<string, unknown>;
  payload: Record<string, unknown>;
  signature: string;
}

function decodeJWT(token: string): JWTParts | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const decodeBase64Url = (str: string) => {
      const base64 = str.replace(/-/g, "+").replace(/_/g, "/");
      const padding = "=".repeat((4 - (base64.length % 4)) % 4);
      return JSON.parse(atob(base64 + padding));
    };

    return {
      header: decodeBase64Url(parts[0]),
      payload: decodeBase64Url(parts[1]),
      signature: parts[2],
    };
  } catch {
    return null;
  }
}

function formatTimestamp(ts: number): string {
  const date = new Date(ts * 1000);
  return date.toLocaleString();
}

function isExpired(exp: number): boolean {
  return Date.now() >= exp * 1000;
}

function isExpiringSoon(exp: number): boolean {
  const fiveMinutes = 5 * 60 * 1000;
  return Date.now() >= exp * 1000 - fiveMinutes && Date.now() < exp * 1000;
}

export function JWTDecoder() {
  const [token, setToken] = useState("");
  const [decoded, setDecoded] = useState<JWTParts | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");

  const handleDecode = useCallback(() => {
    if (!token.trim()) {
      setDecoded(null);
      setError("");
      return;
    }

    const result = decodeJWT(token.trim());
    if (!result) {
      setError("Invalid JWT format. Expected: header.payload.signature");
      setDecoded(null);
    } else {
      setDecoded(result);
      setError("");
    }
  }, [token]);

  const handleCopy = async (type: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      trackCopyAction("jwt-decoder", value.length, "jwt-decoder");
      setCopied(type);
      setTimeout(() => setCopied(""), 1600);
    } catch {
      // Ignore
    }
  };

  const handleLoadSample = () => {
    // Sample JWT (decoded: {"alg":"HS256","typ":"JWT"}/{"sub":"1234567890","name":"John Doe","iat":1516239022,"exp":1516240022})
    setToken(
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
    );
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-6">
      {/* Input */}
      <div>
        <div className="mb-2 flex items-center justify-between">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            JWT Token
          </Label>
          <Button variant="ghost" size="sm" onClick={handleLoadSample} className="text-xs h-6 px-2">
            Load sample
          </Button>
        </div>
        <Textarea
          value={token}
          onChange={(e) => setToken(e.target.value)}
          placeholder="Paste your JWT token here..."
          className="min-h-[100px] rounded-xl font-mono text-sm"
        />
      </div>

      {/* Decode Button */}
      <Button onClick={handleDecode} disabled={!token.trim()} className="w-full">
        <Lock className="mr-2 size-4" />
        Decode Token
      </Button>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="size-4 shrink-0" />
          {error}
        </div>
      )}

      {/* Decoded Token */}
      {decoded && (
        <>
          {/* Header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Header
              </Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy("header", JSON.stringify(decoded.header, null, 2))}
                className="h-6 px-2"
              >
                {copied === "header" ? (
                  <Check className="size-3 text-emerald-500" />
                ) : (
                  <Copy className="size-3" />
                )}
              </Button>
            </div>
            <pre className="rounded-xl border border-border/60 bg-surface/40 p-3 font-mono text-xs overflow-x-auto">
              {JSON.stringify(decoded.header, null, 2)}
            </pre>
          </div>

          {/* Payload */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Payload
              </Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleCopy("payload", JSON.stringify(decoded.payload, null, 2))}
                className="h-6 px-2"
              >
                {copied === "payload" ? (
                  <Check className="size-3 text-emerald-500" />
                ) : (
                  <Copy className="size-3" />
                )}
              </Button>
            </div>
            <pre className="rounded-xl border border-border/60 bg-surface/40 p-3 font-mono text-xs overflow-x-auto">
              {JSON.stringify(decoded.payload, null, 2)}
            </pre>
          </div>

          {/* Claims Summary */}
          {decoded.payload && (
            <div className="grid gap-3 sm:grid-cols-2">
              {decoded.payload.exp !== undefined && (
                <ClaimCard
                  label="Expiration (exp)"
                  value={formatTimestamp(decoded.payload.exp as number)}
                  expired={isExpired(decoded.payload.exp as number)}
                  expiringSoon={isExpiringSoon(decoded.payload.exp as number)}
                />
              )}
              {decoded.payload.iat !== undefined && (
                <ClaimCard
                  label="Issued At (iat)"
                  value={formatTimestamp(decoded.payload.iat as number)}
                />
              )}
              {decoded.payload.nbf !== undefined && (
                <ClaimCard
                  label="Not Before (nbf)"
                  value={formatTimestamp(decoded.payload.nbf as number)}
                />
              )}
              {decoded.payload.sub !== undefined && (
                <ClaimCard label="Subject (sub)" value={String(decoded.payload.sub)} />
              )}
              {decoded.payload.name !== undefined && (
                <ClaimCard label="Name" value={String(decoded.payload.name)} />
              )}
              {decoded.payload.email !== undefined && (
                <ClaimCard label="Email" value={String(decoded.payload.email)} />
              )}
            </div>
          )}

          {/* Signature */}
          <div className="space-y-2">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Signature
            </Label>
            <div className="flex items-center gap-2">
              <code className="flex-1 rounded-lg border border-border/60 bg-surface/40 p-3 font-mono text-xs break-all">
                {decoded.signature}
              </code>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleCopy("signature", decoded.signature)}
              >
                {copied === "signature" ? (
                  <Check className="size-4 text-emerald-500" />
                ) : (
                  <Copy className="size-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Warning */}
          <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-600 dark:text-amber-400">
            <p className="font-semibold mb-1 flex items-center gap-2">
              <Shield className="size-4" />
              Security Notice
            </p>
            <p>
              Only decode JWTs you trust. Never use this tool to decode tokens from untrusted
              sources, as malicious tokens may contain scripts or exploits.
            </p>
          </div>
        </>
      )}
    </div>
  );
}

function ClaimCard({
  label,
  value,
  expired = false,
  expiringSoon = false,
}: {
  label: string;
  value: string;
  expired?: boolean;
  expiringSoon?: boolean;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border/60 bg-surface/40 p-3">
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-mono text-sm font-medium">{value}</p>
      </div>
      {expired ? (
        <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-xs font-semibold text-destructive">
          Expired
        </span>
      ) : expiringSoon ? (
        <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-semibold text-amber-500">
          Expiring Soon
        </span>
      ) : (
        <CheckCircle2 className="size-4 text-emerald-500" />
      )}
    </div>
  );
}
