import * as fs from "fs";
import * as path from "path";
import { CustomerType } from "../utils/types";

export function customers() {
  const base = __dirname;
  const custPath = path.join(base, "../data", "customers.csv");

  // Lecture fichier customers (parsing mélangé avec logique)
  const customers: Record<string, CustomerType> = {};
  const custData = fs.readFileSync(custPath, "utf-8");
  const custLines = custData.split("\n").filter((l) => l.trim());
  const custHeader = custLines[0].split(",");
  for (let i = 1; i < custLines.length; i++) {
    const parts = custLines[i].split(",");
    const id = parts[0];
    customers[id] = {
      id: parts[0],
      name: parts[1],
      level: parts[2] || "BASIC",
      shipping_zone: parts[3] || "ZONE1",
      currency: parts[4] || "EUR",
    };
  }
  return customers;
}
