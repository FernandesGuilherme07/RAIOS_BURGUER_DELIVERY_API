import mongoose, { Document, Schema } from 'mongoose';

export interface ProductModel extends Document {
  name: string;
  description: string;
  price: number;
  imgUrl?: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<ProductModel>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imgUrl: { type: String, required: false },
  category:  { type: String, required: true },
}, { timestamps: true });

export const ProductMongooseModel = mongoose.model<ProductModel>('Product', productSchema);
