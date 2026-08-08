import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
}

export function downloadBlob(data: Blob | BlobPart, filename: string, type?: string): void {
  const blob =
    data instanceof Blob ? data : new Blob([data], { type: type ?? "application/octet-stream" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsArrayBuffer(file);
  });
}

export function readFileAsText(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read file"));
    reader.readAsText(file);
  });
}

let pdfjsPromise: Promise<typeof import("pdfjs-dist")> | null = null;
export function getPdfjs(): Promise<typeof import("pdfjs-dist")> {
  if (pdfjsPromise) return pdfjsPromise;
  pdfjsPromise = (async () => {
    const pdfjs = await import("pdfjs-dist");
    const workerUrl = (await import("pdfjs-dist/build/pdf.worker.min.mjs?url")).default as string;
    pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;
    return pdfjs;
  })();
  return pdfjsPromise;
}

export function audioBufferToWav(
  buffer: AudioBuffer,
  options?: { sampleRate?: number; mono?: boolean },
): ArrayBuffer {
  const targetRate = options?.sampleRate ?? buffer.sampleRate;
  const toMono = options?.mono ?? false;
  const numChannels = toMono ? 1 : buffer.numberOfChannels;
  const numFrames = Math.round(buffer.length * (targetRate / buffer.sampleRate));
  const bytesPerSample = 2;
  const blockAlign = numChannels * bytesPerSample;
  const dataSize = numFrames * blockAlign;
  const ab = new ArrayBuffer(44 + dataSize);
  const view = new DataView(ab);

  const writeStr = (off: number, s: string) => {
    for (let i = 0; i < s.length; i++) view.setUint8(off + i, s.charCodeAt(i));
  };
  writeStr(0, "RIFF");
  view.setUint32(4, 36 + dataSize, true);
  writeStr(8, "WAVE");
  writeStr(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, targetRate, true);
  view.setUint32(28, targetRate * blockAlign, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, 16, true);
  writeStr(36, "data");
  view.setUint32(40, dataSize, true);

  const channels: Float32Array[] = [];
  for (let c = 0; c < buffer.numberOfChannels; c++) channels.push(buffer.getChannelData(c));
  let offset = 44;
  for (let i = 0; i < numFrames; i++) {
    const srcIdx = (i * buffer.sampleRate) / targetRate;
    const srcI = Math.floor(srcIdx);
    for (let c = 0; c < numChannels; c++) {
      let sample: number;
      if (toMono) {
        let sum = 0;
        for (let ch = 0; ch < channels.length; ch++) sum += channels[ch][srcI] || 0;
        sample = sum / channels.length;
      } else {
        sample = channels[c]?.[srcI] ?? 0;
      }
      const clamped = Math.max(-1, Math.min(1, sample));
      view.setInt16(offset, clamped < 0 ? clamped * 0x8000 : clamped * 0x7fff, true);
      offset += 2;
    }
  }
  return ab;
}

export async function decodeAudioFile(file: File): Promise<AudioBuffer> {
  const arrayBuffer = await readFileAsArrayBuffer(file);
  const AudioCtx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new AudioCtx();
  const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
  ctx.close();
  return audioBuffer;
}

let gifWorkerUrl: string | null = null;
export async function getGifEncoder(): Promise<{
  GIF: typeof import("gif.js");
  workerScript: string;
}> {
  const mod = await import("gif.js");
  const GIF = (mod.default ?? mod) as typeof import("gif.js");
  if (!gifWorkerUrl)
    gifWorkerUrl = (await import("gif.js/dist/gif.worker.js?url")).default as string;
  return { GIF, workerScript: gifWorkerUrl };
}

let ffmpegInstance: import("@ffmpeg/ffmpeg").FFmpeg | null = null;
export async function getFfmpeg(): Promise<import("@ffmpeg/ffmpeg").FFmpeg> {
  if (ffmpegInstance && ffmpegInstance.loaded) return ffmpegInstance;
  const { FFmpeg } = await import("@ffmpeg/ffmpeg");
  const ffmpeg = new FFmpeg();
  const coreURL = (await import("@ffmpeg/core?url")).default as string;
  const wasmURL = (await import("@ffmpeg/core/wasm?url")).default as string;
  await ffmpeg.load({ coreURL, wasmURL });
  ffmpegInstance = ffmpeg;
  return ffmpeg;
}
