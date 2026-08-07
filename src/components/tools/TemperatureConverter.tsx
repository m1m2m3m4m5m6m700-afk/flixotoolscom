import { useState } from "react";
import { Label } from "@/components/ui/label";

export function TemperatureConverter() {
  const [celsius, setCelsius] = useState("");
  const [fahrenheit, setFahrenheit] = useState("");
  const [kelvin, setKelvin] = useState("");

  const handleCelsiusChange = (value: string) => {
    setCelsius(value);
    const c = parseFloat(value);
    if (!isNaN(c)) {
      setFahrenheit(((c * 9) / 5 + 32).toFixed(2));
      setKelvin((c + 273.15).toFixed(2));
    } else {
      setFahrenheit("");
      setKelvin("");
    }
  };

  const handleFahrenheitChange = (value: string) => {
    setFahrenheit(value);
    const f = parseFloat(value);
    if (!isNaN(f)) {
      setCelsius((((f - 32) * 5) / 9).toFixed(2));
      setKelvin((((f - 32) * 5) / 9 + 273.15).toFixed(2));
    } else {
      setCelsius("");
      setKelvin("");
    }
  };

  const handleKelvinChange = (value: string) => {
    setKelvin(value);
    const k = parseFloat(value);
    if (!isNaN(k)) {
      setCelsius((k - 273.15).toFixed(2));
      setFahrenheit((((k - 273.15) * 9) / 5 + 32).toFixed(2));
    } else {
      setCelsius("");
      setFahrenheit("");
    }
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Celsius (°C)
        </Label>
        <input
          type="number"
          value={celsius}
          onChange={(e) => handleCelsiusChange(e.target.value)}
          className="w-full rounded-xl border border-border bg-background p-3 text-lg font-medium"
          placeholder="0"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Fahrenheit (°F)
        </Label>
        <input
          type="number"
          value={fahrenheit}
          onChange={(e) => handleFahrenheitChange(e.target.value)}
          className="w-full rounded-xl border border-border bg-background p-3 text-lg font-medium"
          placeholder="32"
        />
      </div>

      <div className="space-y-2">
        <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Kelvin (K)
        </Label>
        <input
          type="number"
          value={kelvin}
          onChange={(e) => handleKelvinChange(e.target.value)}
          className="w-full rounded-xl border border-border bg-background p-3 text-lg font-medium"
          placeholder="273.15"
        />
      </div>

      <div className="rounded-xl border border-border bg-surface/40 p-4 space-y-2">
        <p className="text-xs text-muted-foreground text-center">Common Conversions</p>
        <div className="grid grid-cols-3 gap-2 text-center text-sm">
          <div className="p-2">
            <p className="font-medium">0°C</p>
            <p className="text-muted-foreground">32°F</p>
          </div>
          <div className="p-2">
            <p className="font-medium">100°C</p>
            <p className="text-muted-foreground">212°F</p>
          </div>
          <div className="p-2">
            <p className="font-medium">-40°C</p>
            <p className="text-muted-foreground">-40°F</p>
          </div>
        </div>
      </div>
    </div>
  );
}
