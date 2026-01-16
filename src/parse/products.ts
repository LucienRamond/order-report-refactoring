import * as fs from "fs";
import * as path from "path";
import { ProductType } from "../utils/types";

export function products() {
  const base = __dirname;
  const prodPath = path.join(base, "../data", "products.csv");

  // Lecture fichier products (duplication du parsing)
  const products: Record<string, ProductType> = {};
  const prodData = fs.readFileSync(prodPath, "utf-8");
  const prodLines = prodData.split("\n").filter((l) => l.trim());
  for (let i = 1; i < prodLines.length; i++) {
    const parts = prodLines[i].split(",");
    try {
      products[parts[0]] = {
        id: parts[0],
        name: parts[1],
        category: parts[2],
        price: parseFloat(parts[3]),
        weight: parseFloat(parts[4] || "1.0"),
        taxable: parts[5] === "true",
      };
    } catch (e) {
      // Skip silencieux des erreurs
      continue;
    }
  }
  return products;
}
