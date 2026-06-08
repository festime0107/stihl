import mongoose from "mongoose";

const OrderItemSchema = new mongoose.Schema(
  {
    productId: String,
    name: String,
    price: Number,
    quantity: Number,
  },
  { _id: false }
);

const OrderSchema = new mongoose.Schema(
  {
    customer: {
      name: String,
      phone: String,
      address: String,
    },
    items: [OrderItemSchema],
    total: Number,
    status: {
      type: String,
      enum: ["new", "confirmed", "completed", "cancelled"],
      default: "new",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
