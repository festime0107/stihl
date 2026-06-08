// Produkte fillestare që përdoren vetëm si fallback kur databaza është bosh.
export const defaultProducts = [
  {
    name: "STIHL MS 170",
    category: "Motorsharra",
    price: 25000,
    oldPrice: 28000,
    image: "/images/chainsaw.svg",
    badge: "Best Seller",
    power: "1.2 kW",
    warranty: "12 muaj",
    stock: 8,
    description: "Motorsharrë praktike për punë shtëpie, dru zjarri dhe mirëmbajtje kopshti.",
    isActive: true,
  },
  {
    name: "STIHL MS 251",
    category: "Motorsharra",
    price: 58000,
    oldPrice: 63000,
    image: "/images/chainsaw2.svg",
    badge: "Profesionale",
    power: "2.2 kW",
    warranty: "12 muaj",
    stock: 4,
    description: "Motorsharrë më e fuqishme për përdorim profesional dhe punë më të rënda.",
    isActive: true,
  },
  {
    name: "STIHL FS 55",
    category: "Trimmera",
    price: 32000,
    oldPrice: 36000,
    image: "/images/trimmer.svg",
    badge: "Oferta",
    power: "0.75 kW",
    warranty: "12 muaj",
    stock: 12,
    description: "Trimmer benzine për barishte, kopshte dhe sipërfaqe të vogla.",
    isActive: true,
  },
];

export const categories = ["Të gjitha", "Motorsharra", "Trimmera", "Fryrëse", "Pajisje Kopshti"];
