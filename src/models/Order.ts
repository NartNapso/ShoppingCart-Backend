import mongoose from "mongoose";

export interface IOrder {
  fullName: string;
  address: string;
  email: string;
  cart: { [key: string]: any[] };
}

const OrderSchema = new mongoose.Schema<IOrder>({
  fullName: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  cart: { type: Object, required: true },
});

export const Order = mongoose.model<IOrder>("Order", OrderSchema);
