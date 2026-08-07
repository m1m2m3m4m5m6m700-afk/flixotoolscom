import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Play, Pause, Volume2 } from "lucide-react";

const VOICES = [
  { name: "Google US English", lang: "en-US" },
  { name: "Google UK English", lang: "en-GB" },
  { name: "Google Australia", lang: "en-AU" },
];

export function TextToSpeech() {
  const [text, setText] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = () => {
    if (!text.trim()) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = rate;
    utterance.pitch = pitch;

    const voices = window.speechSynthesis.getVoices();
    const selectedVoice = voices.find((v) => v.lang.startsWith("en")) || voices[0];
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Text to Speak
        </Label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[120px] w-full rounded-xl border border-border bg-background p-3 text-sm"
          placeholder="Type or paste text here to convert to speech..."
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Speed
          </Label>
          <span className="text-sm text-muted-foreground">{rate}x</span>
        </div>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={rate}
          onChange={(e) => setRate(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Pitch
          </Label>
          <span className="text-sm text-muted-foreground">{pitch}x</span>
        </div>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={pitch}
          onChange={(e) => setPitch(parseFloat(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="flex gap-2">
        {isPlaying ? (
          <Button onClick={stop} className="flex-1">
            <Pause className="size-4 mr-2" />
            Stop
          </Button>
        ) : (
          <Button onClick={speak} disabled={!text.trim()} className="flex-1">
            <Play className="size-4 mr-2" />
            Speak
          </Button>
        )}
      </div>

      <div className="rounded-lg bg-amber-500/10 border border-amber-500/30 p-3 text-xs">
        <p className="text-amber-600 dark:text-amber-400">
          <strong>Note:</strong> Uses your browser's built-in speech synthesis. Voice availability
          varies by browser and operating system.
        </p>
      </div>
    </div>
  );
}
