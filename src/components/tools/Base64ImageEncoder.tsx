import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, Copy, Check, ImageIcon } from "lucide-react";

export function Base64ImageEncoder() {
  const [preview, setPreview] = useState<string | null>(null);
  const [base64, setBase64] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    try {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setPreview(result);
        setBase64(result);
      };
      reader.onerror = () => setError("Error reading file");
      reader.readAsDataURL(file);
    } catch {
      setError("Error processing image");
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(base64);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Upload Image
        </Label>
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border p-8 text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors">
            <Upload className="size-6" />
            <span>Click or drag to upload image</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-destructive/10 border border-destructive/30 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {preview && (
        <div className="space-y-2">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Preview
          </Label>
          <div className="flex items-center justify-center rounded-xl border border-border bg-muted/50 p-4">
            <img src={preview} alt="Preview" className="max-h-48 max-w-full object-contain" />
          </div>
        </div>
      )}

      {base64 && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Base64 Data URI
            </Label>
            <Button variant="ghost" size="sm" onClick={handleCopy}>
              {copied ? <Check className="size-4 mr-1" /> : <Copy className="size-4 mr-1" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
          <div className="max-h-32 overflow-auto rounded-xl border border-border bg-muted/50 p-3 font-mono text-xs break-all">
            {base64}
          </div>
        </div>
      )}
    </div>
  );
}
