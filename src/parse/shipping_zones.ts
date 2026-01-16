import * as fs from "fs";
import * as path from "path";
import { ShippingZoneType } from "../utils/types";

export function shipping_zones() {
  const base = __dirname;
  const shipPath = path.join(base, "../data", "shipping_zones.csv");

  const shippingZones: Record<string, ShippingZoneType> = {};
  const shipData = fs.readFileSync(shipPath, "utf-8");
  const shipLines = shipData.split("\n").filter((l) => l.trim());
  for (let i = 1; i < shipLines.length; i++) {
    const p = shipLines[i].split(",");
    shippingZones[p[0]] = {
      zone: p[0],
      base: parseFloat(p[1]),
      per_kg: parseFloat(p[2] || "0.5"),
    };
  }
  return shippingZones;
}
