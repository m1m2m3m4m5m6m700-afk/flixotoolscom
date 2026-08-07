import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";

const BARCODE_PATTERNS: Record<string, RegExp> = {
  // eslint-disable-next-line no-control-regex
  CODE128: /^[^\x00-\x1F\x7F]+$/,
  EAN13: /^\d{12,13}$/,
  UPC: /^\d{11,12}$/,
};

export function BarcodeGenerator() {
  const [text, setText] = useState("");
  const [type, setType] = useState("CODE128");

  const generateBarcode = () => {
    if (!text) return "";
    const url = `https://api.qrserver.com/v1/create-qr-code/?size=300x100&data=${encodeURIComponent(text)}`;
    return url;
  };

  const barcode = generateBarcode();

  const isValid = !text || BARCODE_PATTERNS[type].test(text);

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Barcode Type
        </Label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full rounded-xl border border-border bg-background p-3"
        >
          <option value="CODE128">Code 128 (Alphanumeric)</option>
          <option value="EAN13">EAN-13 (12-13 digits)</option>
          <option value="UPC">UPC-A (11-12 digits)</option>
        </select>
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Enter Data
        </Label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full rounded-xl border border-border bg-background p-3 text-lg font-medium font-mono"
          placeholder={
            type === "CODE128" ? "ABC-123456" : type === "EAN13" ? "5901234123457" : "01234567890"
          }
        />
        {!isValid && (
          <p className="text-xs text-destructive">
            Invalid format for {type}. Please check the requirements.
          </p>
        )}
      </div>

      {barcode && isValid && (
        <div className="flex flex-col items-center gap-4">
          <div className="rounded-xl border border-border bg-white p-4">
            <img
              src={`https://barcodeapi.org/api/1/${type.toLowerCase()}/${encodeURIComponent(text)}`}
              alt="Barcode"
              className="h-24"
              onError={() => setText("")}
            />
          </div>
          <Button
            variant="outline"
            onClick={() => {
              const img = document.querySelector("img[alt='Barcode']") as HTMLImageElement;
              if (img) {
                const link = document.createElement("a");
                link.href = img.src;
                link.download = `barcode-${text}.png`;
                link.click();
              }
            }}
          >
            <Download className="size-4 mr-2" />
            Download
          </Button>
        </div>
      )}
    </div>
  );
}
