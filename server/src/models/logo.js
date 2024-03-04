import mongoose from "mongoose";

const logoSchema = new mongoose.Schema({
    imageUrl: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const Logo = mongoose.model('Logos', logoSchema);

export default Logo;