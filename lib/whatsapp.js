import { businessConfig } from "@/lib/config";
import { formatPrice } from "@/lib/formatters";

export function buildCartWhatsappMessage(cart, customer, orderId) {
  const items = cart
    .map((item, index) => `${index + 1}. ${item.name} - ${item.quantity} copë x ${formatPrice(item.price)}`)
    .join("\n");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return `Përshëndetje! Dua të bëj një porosi STIHL.

Kodi porosisë: ${orderId || "-"}
Emri: ${customer.name || "-"}
Telefoni: ${customer.phone || "-"}
Adresa: ${customer.address || "-"}

Produktet:
${items}

Totali: ${formatPrice(total)}

Ju lutem më kontaktoni për konfirmim.`;
}

export function cartWhatsappLink(cart, customer, orderId) {
  const message = buildCartWhatsappMessage(cart, customer, orderId);
  return `https://wa.me/${businessConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function productWhatsappLink(product) {
  const message = `Përshëndetje! Jam i/e interesuar për produktin ${product.name}, çmimi ${formatPrice(product.price)}.`;
  return `https://wa.me/${businessConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function contactWhatsappLink() {
  return `https://wa.me/${businessConfig.whatsappNumber}`;
}
