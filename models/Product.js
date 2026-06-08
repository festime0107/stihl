import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    oldPrice: { type: Number, default: 0 },
    image: { type: String, default: "/images/chainsaw.svg" },
    badge: { type: String, default: "New" },
    power: { type: String, default: "" },
    warranty: { type: String, default: "12 muaj" },
    stock: { type: Number, default: 0 },
    description: { type: String, default: "" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
