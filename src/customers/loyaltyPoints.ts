import { LOYALTY_RATIO, MAX_DISCOUNT } from "../utils/globals";
import { orders as f_orders } from "../parse/orders";

// Calcul des points de fidélité
export const loyaltyPoints: Record<string, number> = {};

const orders = f_orders();

for (const o of orders) {
  const cid = o.customer_id;
  if (!loyaltyPoints[cid]) {
    loyaltyPoints[cid] = 0;
  }
  // Calcul basé sur le prix de commande
  loyaltyPoints[cid] += o.qty * o.unit_price * LOYALTY_RATIO;
}

export function loyaltyDiscounts(pts: number, loyaltyDiscount: number) {
  if (pts > 100) {
    loyaltyDiscount = Math.min(pts * 0.1, 50.0);
  }
  if (pts > 500) {
    loyaltyDiscount = Math.min(pts * 0.15, 100.0);
  }
  return loyaltyDiscount;
}
