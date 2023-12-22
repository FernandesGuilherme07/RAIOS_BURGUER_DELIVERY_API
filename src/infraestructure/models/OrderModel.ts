import mongoose, { Schema, Document } from 'mongoose';
import { AddressSchema, IAddress } from './ClientModel';

interface IItemAditional {
    name: string, 
    price: number, 
    quantity: number
}

interface ICartItem {
    name: string,
    price: number,
    quantity: number,
    itemAditionals?: IItemAditional[]
}

export interface OrderDocument extends Document {
  status: "preparing" | "sent" | "delivered";
  orderDate: string;
  clientId: string;
  shippingAddress: IAddress;
  shippingPrice: number;
  paymentType: "money" | "card" | "pix";
  readonlypaymentChange?: number;
  cupom?: string;
  cupomDiscount?: number;
  products: ICartItem[];
  subtotal: number;
  total: number;
  outToDeliveryDateTime: string | null;
  dateTimeOrderDelivered: string | null;
}

const ItemAditionalsSchema = new Schema({
  name: String,
  price: Number,
  quantity: Number,
});

const CartItemSchema = new Schema({
  name: String,
  price: Number,
  quantity: Number,
  itemAditionals: [ItemAditionalsSchema],
});


const OrderSchema = new Schema({
  status: {
    type: String,
    enum: ["preparing", "sent", "delivered"],
    required: true,
  },
  orderDate: { type: String, required: true },
  clientId: { type: String, required: true },
  shippingAddress: AddressSchema,
  shippingPrice: { type: Number, required: true },
  paymentType: {
    type: String,
    enum: ["money", "card", "pix"],
    required: true,
  },
  readonlypaymentChange: Number,
  cupom: String,
  cupomDiscount: Number,
  products: [CartItemSchema],
  subtotal: Number,
  total: Number,
  outToDeliveryDateTime: {type: String},
  dateTimeOrderDelivered: {type: String}
});

const OrderModel = mongoose.model<OrderDocument>('Order', OrderSchema);

export default OrderModel;
