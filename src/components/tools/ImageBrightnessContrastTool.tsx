"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Upload, Download, RefreshCw, Copy, Check, Sun, Contrast } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function ImageBrightnessContrastTool() {
  const [image, setImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [brightness, setBrightness] = useState(0);
  const [contrast, setContrast] = useState(0);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processImage = useCallback(() => {
    if (!image || !canvasRef.current) return;

    setLoading(true);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Calculate contrast factor
      const contrastFactor = (259 * (contrast + 255)) / (255 * (259 - contrast));

      for (let i = 0; i < data.length; i += 4) {
        // Apply brightness
        let r = data[i] + brightness;
        let g = data[i + 1] + brightness;
        let b = data[i + 2] + brightness;

        // Apply contrast
        r = contrastFactor * (r - 128) + 128;
        g = contrastFactor * (g - 128) + 128;
        b = contrastFactor * (b - 128) + 128;

        // Clamp values
        data[i] = Math.max(0, Math.min(255, r));
        data[i + 1] = Math.max(0, Math.min(255, g));
        data[i + 2] = Math.max(0, Math.min(255, b));
      }

      ctx.putImageData(imageData, 0, 0);
      setProcessedImage(canvas.toDataURL("image/png"));
      setLoading(false);
    };
    img.src = image;
  }, [image, brightness, contrast]);

  useEffect(() => {
    if (image) {
      const timeoutId = setTimeout(processImage, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [image, brightness, contrast, processImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownload = () => {
    if (!processedImage) return;
    const link = document.createElement("a");
    link.href = processedImage;
    link.download = "adjusted-image.png";
    link.click();
  };

  const handleCopy = async () => {
    if (!processedImage) return;
    const response = await fetch(processedImage);
    const blob = await response.blob();
    await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setBrightness(0);
    setContrast(0);
  };

  const handleResetAll = () => {
    setImage(null);
    setProcessedImage(null);
    setBrightness(0);
    setContrast(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <canvas ref={canvasRef} className="hidden" />

      {!image ? (
        <div
          className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <Upload className="size-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-lg font-medium mb-2">Drop your image here</p>
          <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
          <Button variant="outline" size="sm">
            Choose Image
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Original
            </Label>
            <div className="rounded-xl border border-border bg-muted/30 p-2">
              <img src={image} alt="Original" className="w-full h-auto rounded-lg" />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Adjusted
            </Label>
            <div className="rounded-xl border border-border bg-muted/30 p-2 min-h-[200px]">
              {loading ? (
                <div className="h-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                </div>
              ) : processedImage ? (
                <img src={processedImage} alt="Processed" className="w-full h-auto rounded-lg" />
              ) : null}
            </div>
          </div>
        </div>
      )}

      {image && (
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Sun className="size-4 text-muted-foreground" />
              <Label htmlFor="brightness" className="text-sm font-medium">
                Brightness ({brightness})
              </Label>
            </div>
            <input
              id="brightness"
              type="range"
              min="-100"
              max="100"
              value={brightness}
              onChange={(e) => setBrightness(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Contrast className="size-4 text-muted-foreground" />
              <Label htmlFor="contrast" className="text-sm font-medium">
                Contrast ({contrast})
              </Label>
            </div>
            <input
              id="contrast"
              type="range"
              min="-100"
              max="100"
              value={contrast}
              onChange={(e) => setContrast(Number(e.target.value))}
              className="w-full"
            />
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-2 justify-center">
        {processedImage && (
          <>
            <Button onClick={handleCopy} variant="outline" size="sm">
              {copied ? <Check className="size-4 mr-2" /> : <Copy className="size-4 mr-2" />}
              {copied ? "Copied!" : "Copy"}
            </Button>
            <Button onClick={handleDownload} variant="outline" size="sm">
              <Download className="size-4 mr-2" />
              Download
            </Button>
          </>
        )}
        {image && (
          <Button onClick={handleReset} variant="ghost" size="sm">
            Reset Adjustments
          </Button>
        )}
        <Button onClick={handleResetAll} variant="ghost" size="sm">
          <RefreshCw className="size-4 mr-2" />
          New Image
        </Button>
      </div>
    </div>
  );
}
