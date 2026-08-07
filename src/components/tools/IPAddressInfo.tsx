import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Globe, MapPin, Wifi } from "lucide-react";

export function IPAddressInfo() {
  const [ip, setIp] = useState("");

  const validateIP = (ip: string): boolean => {
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!ipv4Regex.test(ip)) return false;
    return ip.split(".").every((part) => parseInt(part) <= 255);
  };

  const getIPClass = (ip: string): string => {
    const firstOctet = parseInt(ip.split(".")[0]);
    if (firstOctet >= 1 && firstOctet <= 126) return "Class A";
    if (firstOctet >= 128 && firstOctet <= 191) return "Class B";
    if (firstOctet >= 192 && firstOctet <= 223) return "Class C";
    if (firstOctet >= 224 && firstOctet <= 239) return "Class D (Multicast)";
    return "Class E (Reserved)";
  };

  const isPrivate = (ip: string): boolean => {
    const firstOctet = parseInt(ip.split(".")[0]);
    const first = parseInt(ip.split(".")[0]);
    const second = parseInt(ip.split(".")[1]);
    return (
      ip.startsWith("10.") ||
      ip.startsWith("172.16.") ||
      ip.startsWith("172.17.") ||
      ip.startsWith("172.18.") ||
      ip.startsWith("172.19.") ||
      ip.startsWith("172.20.") ||
      ip.startsWith("172.21.") ||
      ip.startsWith("172.22.") ||
      ip.startsWith("172.23.") ||
      ip.startsWith("172.24.") ||
      ip.startsWith("172.25.") ||
      ip.startsWith("172.26.") ||
      ip.startsWith("172.27.") ||
      ip.startsWith("172.28.") ||
      ip.startsWith("172.29.") ||
      ip.startsWith("172.30.") ||
      ip.startsWith("172.31.") ||
      ip.startsWith("192.168.") ||
      firstOctet === 127
    );
  };

  const ipParts = ip.split(".");
  const valid = validateIP(ip);

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Enter IP Address
        </Label>
        <input
          type="text"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
          className="w-full rounded-xl border border-border bg-background p-4 font-mono text-lg"
          placeholder="192.168.1.1"
        />
      </div>

      {ip && (
        <>
          <div
            className={`rounded-xl border p-4 text-center ${
              valid
                ? "border-emerald-500/30 bg-emerald-500/10"
                : "border-destructive/30 bg-destructive/10"
            }`}
          >
            <p className={`font-semibold ${valid ? "text-emerald-600" : "text-destructive"}`}>
              {valid ? "Valid IPv4 Address" : "Invalid IPv4 Address"}
            </p>
          </div>

          {valid && (
            <div className="space-y-3">
              <div className="grid grid-cols-4 gap-2">
                {ipParts.map((part, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-border bg-muted/30 p-3 text-center"
                  >
                    <p className="text-xs text-muted-foreground">Octet {i + 1}</p>
                    <p className="text-xl font-mono font-bold">{part}</p>
                    <p className="text-xs font-mono">
                      ({parseInt(part).toString(2).padStart(8, "0")})
                    </p>
                  </div>
                ))}
              </div>

              <div className="grid gap-2">
                <div className="flex justify-between rounded-lg border border-border bg-muted/30 p-3">
                  <span className="flex items-center gap-2">
                    <Globe className="size-4" /> IP Class
                  </span>
                  <span className="font-mono">{getIPClass(ip)}</span>
                </div>
                <div className="flex justify-between rounded-lg border border-border bg-muted/30 p-3">
                  <span className="flex items-center gap-2">
                    <Wifi className="size-4" /> Type
                  </span>
                  <span
                    className={`font-mono ${isPrivate(ip) ? "text-amber-600" : "text-emerald-600"}`}
                  >
                    {isPrivate(ip) ? "Private" : "Public"}
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-border bg-muted/30 p-4 text-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Binary
                </p>
                <p className="font-mono">
                  {ipParts.map((p) => parseInt(p).toString(2).padStart(8, "0")).join(".")}
                </p>
              </div>

              <div className="rounded-xl border border-border bg-muted/30 p-4 text-sm">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Hexadecimal
                </p>
                <p className="font-mono">
                  {ipParts
                    .map((p) => parseInt(p).toString(16).padStart(2, "0").toUpperCase())
                    .join(".")}
                </p>
              </div>
            </div>
          )}
        </>
      )}

      {!ip && (
        <div className="rounded-xl border border-border bg-muted/30 p-8 text-center text-muted-foreground">
          Enter an IP address to analyze
        </div>
      )}
    </div>
  );
}
