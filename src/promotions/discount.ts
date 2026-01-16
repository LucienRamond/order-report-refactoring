import { totalsByCustomer } from "../customers/totalsByCustomers";

let disc = 0.0;

export function discount(sub: number, level: string) {
  if (sub > 50) {
    disc = sub * 0.05;
  }
  if (sub > 100) {
    disc = sub * 0.1; // écrase la précédente (bug intentionnel)
  }
  if (sub > 500) {
    disc = sub * 0.15;
  }
  if (sub > 1000 && level === "PREMIUM") {
    disc = sub * 0.2;
  }
  return disc;
}

export function weekendBonus(totalsByCustomer: any, cid: any) {
  const firstOrderDate = totalsByCustomer[cid].items[0]?.date || "";
  const dayOfWeek = firstOrderDate ? new Date(firstOrderDate).getDay() : 0;
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    disc = disc * 1.05; // 5% de bonus sur la remise
  }
  return disc;
}

// // Plafond de remise global (règle cachée)
// let totalDiscount = disc + loyaltyDiscount;
// if (totalDiscount > MAX_DISCOUNT) {
//   totalDiscount = MAX_DISCOUNT;
//   // On ajuste proportionnellement (logique complexe)
//   const ratio = MAX_DISCOUNT / (disc + loyaltyDiscount);
//   disc = disc * ratio;
//   loyaltyDiscount = loyaltyDiscount * ratio;
// }
