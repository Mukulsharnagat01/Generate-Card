import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    id: String,
    kind: { type: String, enum: ['classic', 'server'] },
    data: { type: mongoose.Schema.Types.Mixed },
    selectedFont: String,
    fontSize: Number,
    textColor: String,
    accentColor: String,
    price: Number,
    serverMeta: {
      name: String,
      background_url: String,
      back_background_url: String,
      config: mongoose.Schema.Types.Mixed
    },
    saveAsTemplate: Boolean,
    templateName: String,
    frontData: mongoose.Schema.Types.Mixed,
    backData: mongoose.Schema.Types.Mixed,
    frontImageUrl: String,
    backImageUrl: String,
    thumbnailUrl: String
  }]
}, { timestamps: true });

export default mongoose.models.Cart || mongoose.model('Cart', cartItemSchema);