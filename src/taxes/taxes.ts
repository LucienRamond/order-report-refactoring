import { totalsByCustomer } from "../customers/totalsByCustomers";
import { products as f_products } from "../parse/products";
import { TAX } from "../utils/globals";

const products = f_products();

export function allTaxables(allTaxable: boolean, cid: any) {
  for (const item of totalsByCustomer[cid].items) {
    const prod = products[item.product_id];
    if (prod && prod.taxable === false) {
      return false;
    }
  }
  return true;
}

export function taxes(
  allTaxable: boolean,
  taxable: any,
  tax: number,
  cid: any
) {
  if (allTaxable) {
    tax = Math.round(taxable * TAX * 100) / 100; // Arrondi à 2 décimales
    return tax;
  } else {
    // Calcul taxe par ligne (plus complexe)
    for (const item of totalsByCustomer[cid].items) {
      const prod = products[item.product_id];
      if (prod && prod.taxable !== false) {
        const itemTotal = item.qty * (prod.price || item.unit_price);
        tax += itemTotal * TAX;
      }
    }
    return (tax = Math.round(tax * 100) / 100);
  }
}
