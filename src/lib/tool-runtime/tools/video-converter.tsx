import { useState } from "react";
import { RefreshCw, Upload, ShieldCheck, AlertCircle, Film } from "lucide-react";
import { downloadBlob, formatBytes, getFfmpeg, readFileAsArrayBuffer } from "@/lib/utils";
import type { ReadyToolRuntimeDefinition } from "../types";

function VideoConverterTool() {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{ name: string; size: number } | null>(null);
  const [progress, setProgress] = useState(0);
  const [format, setFormat] = useState<"webm" | "mp4">("webm");

  const handleProcess = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError("");
    setResult(null);
    setProgress(0);
    try {
      const ffmpeg = await getFfmpeg();
      const inExt = (file.name.split(".").pop() || "").toLowerCase();
      const inName = "input." + inExt;
      const outName = "output." + format;
      const data = new Uint8Array(await readFileAsArrayBuffer(file));
      await ffmpeg.writeFile(inName, data);
      const progressCb = ({ progress }: { progress: number }) =>
        setProgress(Math.round(progress * 100));
      ffmpeg.on("progress", progressCb);
      const codec = format === "webm" ? "libvpx-vp9" : "libx264";
      await ffmpeg.exec([
        "-i",
        inName,
        "-c:v",
        codec,
        "-b:v",
        "1M",
        "-c:a",
        format === "webm" ? "libvorbis" : "aac",
        outName,
      ]);
      ffmpeg.off("progress", progressCb);
      const outData = (await ffmpeg.readFile(outName)) as Uint8Array;
      const outFile = file.name.replace(/\.[^.]+$/, "") + "." + format;
      downloadBlob(
        new Uint8Array(outData),
        outFile,
        format === "webm" ? "video/webm" : "video/mp4",
      );
      setResult({ name: outFile, size: outData.length });
      try {
        await ffmpeg.deleteFile(inName);
        await ffmpeg.deleteFile(outName);
      } catch {
        /* ignore */
      }
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Failed to convert video. The format may be unsupported.",
      );
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6 md:p-8 space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-foreground">Upload Video File</label>
          <div className="rounded-2xl border border-dashed border-border p-6 text-center bg-muted/20 hover:bg-muted/30 transition-colors cursor-pointer">
            <input
              type="file"
              id="vid-conv-upload"
              accept="video/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) {
                  setFile(f);
                  setError("");
                  setResult(null);
                  setProgress(0);
                }
              }}
            />
            <label
              htmlFor="vid-conv-upload"
              className="cursor-pointer flex flex-col items-center gap-1"
            >
              <Upload className="size-6 text-primary" />
              <span className="text-xs font-semibold text-foreground">
                {file ? file.name : "Drop a video here, or click to browse"}
              </span>
              {file && (
                <span className="text-[11px] text-muted-foreground">{formatBytes(file.size)}</span>
              )}
            </label>
          </div>
          <div>
            <label className="text-xs text-muted-foreground">Convert to</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as typeof format)}
              className="w-full mt-1 rounded-lg border border-border bg-background p-2 text-sm"
            >
              <option value="webm">WebM (VP9)</option>
              <option value="mp4">MP4 (H.264)</option>
            </select>
          </div>
          <p className="text-[11px] text-muted-foreground">
            Powered by FFmpeg running locally in your browser via WebAssembly.
          </p>
          <button
            type="button"
            onClick={handleProcess}
            disabled={!file || isProcessing}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="size-4 animate-spin" />
                Converting... {progress}%
              </>
            ) : (
              <>
                <Film className="size-4" />
                Convert Video
              </>
            )}
          </button>
        </div>
        <div className="space-y-4 flex flex-col justify-between">
          <div className="h-full rounded-2xl border border-border bg-background/50 p-4 text-sm flex flex-col items-center justify-center text-center gap-3">
            {error ? (
              <div className="flex flex-col items-center gap-2 text-destructive">
                <AlertCircle className="size-8" />
                <span className="text-xs">{error}</span>
              </div>
            ) : result ? (
              <div className="flex flex-col items-center gap-2 text-emerald-600">
                <Film className="size-8" />
                <span className="text-sm font-semibold">{result.name}</span>
                <span className="text-xs text-muted-foreground">{formatBytes(result.size)}</span>
                <span className="text-xs">Downloaded successfully</span>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Film className="size-8 opacity-40" />
                <span>Your converted video will download here.</span>
              </div>
            )}
          </div>
          <div className="rounded-xl border border-border/70 bg-muted/10 p-3.5 flex items-center gap-3">
            <ShieldCheck className="size-5 text-emerald-500 shrink-0" />
            <p className="text-xs text-muted-foreground">
              100% Client-side processing. Your files and data remain strictly on your local device.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const VideoConverterRuntime: ReadyToolRuntimeDefinition = {
  toolId: "video-converter",
  slug: "video-converter",
  categoryId: "video",
  icon: Film,
  component: VideoConverterTool,
  layoutDescription:
    "Convert videos between MP4 and WebM formats using FFmpeg, entirely in your browser.",
  layoutDescriptionKey: "tool.video-converter.pageDescription",
};
