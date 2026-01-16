import * as fs from "fs";
import * as path from "path";
import { OrderType } from "../utils/types";

export function orders() {
  const base = __dirname;
  const ordPath = path.join(base, "../data", "orders.csv");

  // Lecture orders (parsing avec try/catch mais logique mélangée)
  const orders: OrderType[] = [];
  const ordData = fs.readFileSync(ordPath, "utf-8");
  const ordLines = ordData.split("\n").filter((l) => l.trim());
  for (let i = 1; i < ordLines.length; i++) {
    const parts = ordLines[i].split(",");
    try {
      const qty = parseInt(parts[3]);
      const price = parseFloat(parts[4]);

      orders.push({
        id: parts[0],
        customer_id: parts[1],
        product_id: parts[2],
        qty: qty,
        unit_price: price,
        date: parts[5],
        promo_code: parts[6] || "",
        time: parts[7] || "12:00",
      });
    } catch (e) {
      // Skip silencieux
      continue;
    }
  }
  return orders;
}
