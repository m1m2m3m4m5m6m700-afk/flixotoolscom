"use client";

import { useState, useMemo } from "react";
import { Fuel, RefreshCw, Car, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export function FuelCostCalculator() {
  const [distance, setDistance] = useState(500);
  const [fuelEfficiency, setFuelEfficiency] = useState(30); // MPG or L/100km
  const [fuelPrice, setFuelPrice] = useState(3.5);
  const [unit, setUnit] = useState<"mpg" | "l100">("mpg");

  const calculations = useMemo(() => {
    const gallonsUsed =
      unit === "mpg" ? distance / fuelEfficiency : ((distance / 100) * fuelEfficiency) / 3.78541;

    const litersUsed =
      unit === "mpg" ? (distance / fuelEfficiency) * 3.78541 : (distance / 100) * fuelEfficiency;

    // Price is per liter
    const pricePerLiter = fuelPrice;
    const totalCost = litersUsed * pricePerLiter;
    const costPerKm = distance > 0 ? totalCost / distance : 0;

    return {
      gallonsUsed,
      litersUsed,
      totalCost,
      costPerKm,
    };
  }, [distance, fuelEfficiency, fuelPrice, unit]);

  const formatNumber = (value: number, decimals = 2) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(value);
  };

  const handleReset = () => {
    setDistance(500);
    setFuelEfficiency(30);
    setFuelPrice(3.5);
    setUnit("mpg");
  };

  return (
    <div className="rounded-3xl border border-border bg-card/80 p-4 shadow-soft backdrop-blur md:p-6 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Button
          onClick={() => setUnit("mpg")}
          variant={unit === "mpg" ? "default" : "outline"}
          size="sm"
        >
          Miles / MPG
        </Button>
        <Button
          onClick={() => setUnit("l100")}
          variant={unit === "l100" ? "default" : "outline"}
          size="sm"
        >
          km / L/100km
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="distance" className="text-sm font-medium">
              Distance ({unit === "mpg" ? "miles" : "km"})
            </Label>
            <div className="relative">
              <input
                id="distance"
                type="number"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full rounded-lg border border-border bg-background pl-4 pr-4 py-2"
              />
            </div>
            <div className="flex gap-2 text-xs">
              {[100, 250, 500, 1000].map((d) => (
                <button
                  key={d}
                  onClick={() => setDistance(d)}
                  className="px-2 py-1 rounded bg-muted hover:bg-muted/80"
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fuelEfficiency" className="text-sm font-medium">
              Fuel Efficiency ({unit === "mpg" ? "MPG" : "L/100km"})
            </Label>
            <input
              id="fuelEfficiency"
              type="range"
              min={unit === "mpg" ? 10 : 4}
              max={unit === "mpg" ? 60 : 20}
              step="1"
              value={fuelEfficiency}
              onChange={(e) => setFuelEfficiency(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{unit === "mpg" ? "10 MPG" : "4 L/100km"}</span>
              <span>
                {fuelEfficiency} {unit === "mpg" ? "MPG" : "L/100km"}
              </span>
              <span>{unit === "mpg" ? "60 MPG" : "20 L/100km"}</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="fuelPrice" className="text-sm font-medium">
              Fuel Price (per liter)
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                $
              </span>
              <input
                id="fuelPrice"
                type="number"
                step="0.01"
                value={fuelPrice}
                onChange={(e) => setFuelPrice(Number(e.target.value))}
                className="w-full rounded-lg border border-border bg-background pl-8 pr-4 py-2"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border border-border bg-primary/5 p-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Fuel className="size-6 text-primary" />
              <span className="text-sm text-muted-foreground">Estimated Fuel Cost</span>
            </div>
            <p className="text-5xl font-bold text-primary">
              {formatCurrency(calculations.totalCost)}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl border border-border bg-muted/30 p-4 text-center">
              <p className="text-sm text-muted-foreground">Fuel Used</p>
              <p className="text-2xl font-bold">
                {unit === "mpg"
                  ? `${formatNumber(calculations.gallonsUsed)} gal`
                  : `${formatNumber(calculations.litersUsed)} L`}
              </p>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-4 text-center">
              <p className="text-sm text-muted-foreground">Cost per km</p>
              <p className="text-2xl font-bold">{formatCurrency(calculations.costPerKm)}</p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-muted/30 p-4">
            <h4 className="text-sm font-semibold mb-2">Trip Breakdown</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Distance</span>
                <span className="font-medium">
                  {formatNumber(distance)} {unit === "mpg" ? "miles" : "km"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fuel Efficiency</span>
                <span className="font-medium">
                  {fuelEfficiency} {unit === "mpg" ? "MPG" : "L/100km"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Fuel Price</span>
                <span className="font-medium">{formatCurrency(fuelPrice)}/L</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between">
                <span className="font-medium">Total Cost</span>
                <span className="font-bold text-primary">
                  {formatCurrency(calculations.totalCost)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button onClick={handleReset} variant="ghost" size="sm">
          <RefreshCw className="size-4 mr-2" />
          Reset
        </Button>
      </div>
    </div>
  );
}
