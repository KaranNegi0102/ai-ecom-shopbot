import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    text: {
      type: string,
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.User,
      enum: ["user", "bot"],
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    productDetails: {
      type: mongoose.Schema.Types.product,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
const message =
  mongoose.models.message || mongoose.model("message", messageSchema);
export default message;
