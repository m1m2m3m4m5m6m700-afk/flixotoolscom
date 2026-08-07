/**
 * Unit Converter Tool
 * Convert between various units
 */
import { Scale } from "lucide-react";
import { createConverterTool } from "../engines/converter-tools";

const lengthConversions: Record<string, Record<string, number>> = {
  meter: { meter: 1, kilometer: 0.001, centimeter: 100, millimeter: 1000, mile: 0.000621371, yard: 1.09361, foot: 3.28084, inch: 39.3701 },
  kilometer: { meter: 1000, kilometer: 1, centimeter: 100000, millimeter: 1000000, mile: 0.621371, yard: 1093.61, foot: 3280.84, inch: 39370.1 },
  mile: { meter: 1609.34, kilometer: 1.60934, centimeter: 160934, millimeter: 1609340, mile: 1, yard: 1760, foot: 5280, inch: 63360 },
  foot: { meter: 0.3048, kilometer: 0.0003048, centimeter: 30.48, millimeter: 304.8, mile: 0.000189394, yard: 0.333333, foot: 1, inch: 12 },
  inch: { meter: 0.0254, kilometer: 0.0000254, centimeter: 2.54, millimeter: 25.4, mile: 0.0000157828, yard: 0.0277778, foot: 0.0833333, inch: 1 },
};

const weightConversions: Record<string, Record<string, number>> = {
  kilogram: { kilogram: 1, gram: 1000, milligram: 1000000, pound: 2.20462, ounce: 35.274, ton: 0.001 },
  gram: { kilogram: 0.001, gram: 1, milligram: 1000, pound: 0.00220462, ounce: 0.035274, ton: 0.000001 },
  pound: { kilogram: 0.453592, gram: 453.592, milligram: 453592, pound: 1, ounce: 16, ton: 0.000453592 },
  ounce: { kilogram: 0.0283495, gram: 28.3495, milligram: 28349.5, pound: 0.0625, ounce: 1, ton: 0.0000283495 },
};

const temperatureConversions = (value: number, from: string, to: string): number => {
  if (from === to) return value;
  
  // Convert to Celsius first
  let celsius: number;
  switch (from) {
    case "celsius": celsius = value; break;
    case "fahrenheit": celsius = (value - 32) * 5/9; break;
    case "kelvin": celsius = value - 273.15; break;
    default: celsius = value;
  }
  
  // Convert from Celsius to target
  switch (to) {
    case "celsius": return celsius;
    case "fahrenheit": return celsius * 9/5 + 32;
    case "kelvin": return celsius + 273.15;
    default: return celsius;
  }
};

export const unitConverterTool = {
  id: "unit-converter",
  slug: "unit-converter",
  name: "Unit Converter",
  description: "Convert between different units of measurement. Length, weight, temperature, and more.",
  icon: Scale,
  category: "converters" as const,
  tags: ["unit", "convert", "length", "weight", "temperature", "conversion", "converter"],
  status: "ready" as const,
  runtime: createConverterTool({
    id: "unit-converter",
    name: "Unit Converter",
    description: "Convert between units",
    icon: Scale,
    units: ["meter", "kilometer", "centimeter", "millimeter", "mile", "yard", "foot", "inch"],
    convert: (value, from, to) => {
      const conversions = lengthConversions[from];
      if (conversions && conversions[to]) {
        return value * conversions[to];
      }
      return temperatureConversions(value, from, to);
    },
  }),
};

export default unitConverterTool;
