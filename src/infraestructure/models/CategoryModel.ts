import mongoose, { Document, Schema } from 'mongoose';

export interface CategoryModel extends Document {
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<CategoryModel>({
  name: { type: String, required: true },
}, { timestamps: true });

export const CategoryMongooseModel = mongoose.model<CategoryModel>('Category', categorySchema);
