import { timeStamp } from 'console';
import mongoose, { Schema, Document } from 'mongoose';

export interface IAddress {
  zipCode: string;
  street: string;
  number: string;
  complement?: string;
  city: string;
  state: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
}

interface IClient extends Document {
  name: string;
  email: string;
  rule: "admin" | "client";
  password: string;
  addresses?: IAddress[];
  createdAt: Date;
  updatedAt: Date;
}

export const AddressSchema = new Schema({
  zipCode: {
    type: String,
  },
  street: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  complement: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const ClientSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  rule: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  addresses: [AddressSchema],
}, { timestamps: true });

const ClientModel = mongoose.model<IClient>('Client', ClientSchema);

export { IClient, ClientModel };
