// Formatim deterministik i çmimeve që të mos japë hydration mismatch.
export function formatPrice(value) {
  const number = Number(value || 0);
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " ALL";
}
