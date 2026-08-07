import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Download, Copy, Check } from "lucide-react";

export function QrCodeGenerator() {
  const [text, setText] = useState("");
  const [qrCode, setQRCode] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!text) {
      setQRCode("");
      return;
    }

    const generateQR = async () => {
      try {
        const url = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`;
        setQRCode(url);
      } catch {
        setQRCode("");
      }
    };

    const timeout = setTimeout(generateQR, 300);
    return () => clearTimeout(timeout);
  }, [text]);

  const handleDownload = () => {
    if (!qrCode) return;
    const link = document.createElement("a");
    link.href = qrCode;
    link.download = "qrcode.png";
    link.click();
  };

  const handleCopy = async () => {
    if (!qrCode) return;
    await navigator.clipboard.writeText(qrCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Enter Text or URL
        </Label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[80px] w-full rounded-xl border border-border bg-background p-3 text-sm"
          placeholder="https://example.com"
        />
      </div>

      {qrCode && (
        <div className="flex flex-col items-center gap-4">
          <div className="rounded-xl border border-border bg-white p-4">
            <img src={qrCode} alt="QR Code" className="size-48" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleDownload}>
              <Download className="size-4 mr-2" />
              Download
            </Button>
            <Button variant="outline" onClick={handleCopy}>
              {copied ? <Check className="size-4 mr-2" /> : <Copy className="size-4 mr-2" />}
              {copied ? "Copied!" : "Copy URL"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
