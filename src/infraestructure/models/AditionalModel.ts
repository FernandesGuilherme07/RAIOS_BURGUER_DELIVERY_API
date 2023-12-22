import mongoose, { Document, Schema } from 'mongoose';

export interface AditionalModel extends Document {
  name: string;
  description: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

const aditional = new Schema<AditionalModel>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
}, { timestamps: true });

export const AdionalMongooseModel = mongoose.model<AditionalModel>('Aditional', aditional);
