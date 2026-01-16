import * as fs from "fs";
import * as path from "path";
import { PromotionType } from "../utils/types";

export function promotions() {
  const base = __dirname;
  const promoPath = path.join(base, "../data", "promotions.csv");

  // Lecture promotions (parsing légèrement différent encore)
  const promotions: Record<string, PromotionType> = {};
  try {
    const promoData = fs.readFileSync(promoPath, "utf-8");
    const promoLines = promoData.split("\n").filter((l) => l.trim());
    for (let i = 1; i < promoLines.length; i++) {
      const p = promoLines[i].split(",");
      promotions[p[0]] = {
        code: p[0],
        type: p[1], // PERCENTAGE ou FIXED
        value: p[2],
        active: p[3] !== "false",
      };
    }
  } catch (err) {
    // Si pas de fichier promo, on continue
  }
  return promotions;
}
