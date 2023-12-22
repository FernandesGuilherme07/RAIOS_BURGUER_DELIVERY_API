import mongoose, { Schema, Document } from 'mongoose';

export interface IProductAditionals extends Document {
  productId: string;
  aditionals: string[];
}

const ProductAditionalsSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product', 
    required: true,
  },
  aditionals:{
    type: [{
            type: Schema.Types.ObjectId,
            ref: 'Aditional',
            required: true,
        }],
    required: false
    },
});

const ProductAditionalsModel = mongoose.model<IProductAditionals>('ProductAditionals', ProductAditionalsSchema);

export default ProductAditionalsModel;
