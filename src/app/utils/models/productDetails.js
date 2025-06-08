import mongoose from "mongoose";

const productDetailsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
productDetailsSchema.index({ name: 1, category: 1 });
productDetailsSchema.index({ price: 1 });

const productDetails = mongoose.models.productDetails || mongoose.model('product', productDetailsSchema);
export default productDetails;
