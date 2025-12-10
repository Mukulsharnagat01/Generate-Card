// import mongoose from 'mongoose';

// const cartItemSchema = new mongoose.Schema({
//   userId: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: 'User', 
//     required: true,
//     index: true
//   },
//   items: [{
//     id: {
//       type: String,
//       required: true
//     },
//     kind: { 
//       type: String, 
//       enum: ['classic', 'server'],
//       required: true
//     },
//     data: { 
//       type: mongoose.Schema.Types.Mixed,
//       required: true
//     },
//     selectedFont: {
//       type: String,
//       default: 'Arial, sans-serif'
//     },
//     fontSize: {
//       type: Number,
//       default: 16
//     },
//     textColor: {
//       type: String,
//       default: '#000000'
//     },
//     accentColor: {
//       type: String,
//       default: '#0ea5e9'
//     },
//     price: {
//       type: Number,
//       required: true,
//       min: 0
//     },
//     serverMeta: {
//       name: String,
//       background_url: String,
//       back_background_url: String,
//       config: mongoose.Schema.Types.Mixed,
//       qrColor: String,
//       qrLogoUrl: String
//     },
//     saveAsTemplate: {
//       type: Boolean,
//       default: false
//     },
//     templateName: String,
//     frontData: mongoose.Schema.Types.Mixed,
//     backData: mongoose.Schema.Types.Mixed,
//     frontImageUrl: String,
//     backImageUrl: String,
//     thumbnailUrl: String,
//     createdAt: {
//       type: Date,
//       default: Date.now
//     },
//     updatedAt: {
//       type: Date,
//       default: Date.now
//     }
//   }]
// }, { 
//   timestamps: true,
//   toJSON: { 
//     virtuals: true,
//     transform: function(doc, ret) {
//       delete ret._id;
//       delete ret.__v;
//       return ret;
//     }
//   }
// });

// // Index for faster queries
// cartItemSchema.index({ userId: 1, 'items.id': 1 }, { unique: true });

// // Pre-save hook to update timestamps
// cartItemSchema.pre('save', function(next) {
//   this.updatedAt = Date.now();
//   next();
// });

// export default mongoose.models.Cart || mongoose.model('Cart', cartItemSchema);

// models/Cart.js mein yeh ensure karein

// import mongoose from 'mongoose';

// const cartItemSchema = new mongoose.Schema({
//   id: {
//     type: String,
//     required: true
//   },
//   kind: {
//     type: String,
//     enum: ['classic', 'server'],
//     required: true
//   },
//   data: {
//     type: mongoose.Schema.Types.Mixed,
//     required: true
//   },
//   selectedFont: {
//     type: String,
//     default: 'Arial, sans-serif'
//   },
//   fontSize: {
//     type: Number,
//     default: 16
//   },
//   textColor: {
//     type: String,
//     default: '#000000'
//   },
//   accentColor: {
//     type: String,
//     default: '#0ea5e9'
//   },
//   price: {
//     type: Number,
//     required: true,
//     min: 0
//   },
//   serverMeta: {
//     name: String,
//     background_url: String,
//     back_background_url: String,
//     config: mongoose.Schema.Types.Mixed,
//     qrColor: String,
//     qrLogoUrl: String
//   },
//   design: {
//     positions: {
//       name: { x: Number, y: Number },
//       title: { x: Number, y: Number },
//       company: { x: Number, y: Number },
//       logo: { x: Number, y: Number }
//     },
//     sizes: {
//       name: Number,
//       title: Number,
//       company: Number,
//       logo: Number
//     },
//     positionsBack: {
//       email: { x: Number, y: Number },
//       phone: { x: Number, y: Number },
//       website: { x: Number, y: Number },
//       address: { x: Number, y: Number },
//       qr: { x: Number, y: Number }
//     },
//     backSizes: {
//       email: Number,
//       phone: Number,
//       website: Number,
//       address: Number,
//       qr: Number
//     },
//     font: String,
//     fontSize: Number,
//     textColor: String,
//     accentColor: String,
//     isEditLayout: Boolean,
//     qrColor: String,
//     qrLogoUrl: String,
//     qrData: String
//   },
//   frontImageUrl: String,
//   backImageUrl: String,
//   thumbnailUrl: String,
//   createdAt: {
//     type: Date,
//     default: Date.now
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// const cartSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//     unique: true,
//     index: true
//   },
//   items: [cartItemSchema]
// }, {
//   timestamps: true,
//   toJSON: {
//     transform: function(doc, ret) {
//       ret.id = ret._id;
//       delete ret._id;
//       delete ret.__v;
//       return ret;
//     }
//   }
// });

// // Update timestamps for items when cart is saved
// cartSchema.pre('save', function(next) {
//   if (this.isModified('items')) {
//     this.items.forEach(item => {
//       if (!item.createdAt) item.createdAt = new Date();
//       item.updatedAt = new Date();
//     });
//   }
//   next();
// });

// export default mongoose.models.Cart || mongoose.model('Cart', cartSchema);

// import mongoose from 'mongoose';

// const cartItemSchema = new mongoose.Schema({
//   productId: {
//     type: String,
//     required: true
//   },
//   templateId: {
//     type: String,
//     required: true
//   },
//   kind: {
//     type: String,
//     enum: ['classic', 'server'],
//     required: true
//   },
//   quantity: {
//     type: Number,
//     default: 1,
//     min: 1
//   },
  
//   // User data
//   data: {
//     name: String,
//     title: String,
//     company: String,
//     email: String,
//     phone: String,
//     website: String,
//     address: String,
//     logo: String,
//     cardType: String,
//     paperType: String
//   },
  
//   // Design customization
//   selectedFont: {
//     type: String,
//     default: 'Arial, sans-serif'
//   },
//   fontSize: {
//     type: Number,
//     default: 16
//   },
//   textColor: {
//     type: String,
//     default: '#000000'
//   },
//   accentColor: {
//     type: String,
//     default: '#0ea5e9'
//   },
  
//   // Pricing
//   price: {
//     type: Number,
//     required: true,
//     min: 0
//   },
//   totalPrice: {
//     type: Number,
//     default: 0
//   },
  
//    // ✅ Images (Front & Back URLs / Base64 Data)
//     positions: {
//       name: { x: Number, y: Number },
//       title: { x: Number, y: Number },
//       company: { x: Number, y: Number },
//       logo: { x: Number, y: Number }
//     },
//     sizes: {
//       name: Number,
//       title: Number,
//       company: Number,
//       logo: Number
//     },
//     positionsBack: {
//       email: { x: Number, y: Number },
//       phone: { x: Number, y: Number },
//       website: { x: Number, y: Number },
//       address: { x: Number, y: Number },
//       qr: { x: Number, y: Number }
//     },
//     backSizes: {
//       email: Number,
//       phone: Number,
//       website: Number,
//       address: Number,
//       qr: Number
//     },
//     font: String,
//     fontSize: Number,
//     textColor: String,
//     accentColor: String,
//     isEditLayout: Boolean,
//     qrColor: String,
//     qrLogoUrl: String,
//     qrData: String
//   },
  
//   // Image URLs (from Cloudinary)
//   frontImageUrl: String,
//   backImageUrl: String,
//   thumbnailUrl: String,
  
//   // Timestamps
//   createdAt: {
//     type: Date,
//     default: Date.now
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// const cartSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//     index: true
//   },
//   items: [cartItemSchema],
//   totalItems: {
//     type: Number,
//     default: 0
//   },
//   subTotal: {
//     type: Number,
//     default: 0
//   },
//   discount: {
//     type: Number,
//     default: 0
//   },
//   shipping: {
//     type: Number,
//     default: 0
//   },
//   totalAmount: {
//     type: Number,
//     default: 0
//   },
//   status: {
//     type: String,
//     enum: ['active', 'checkout', 'purchased', 'abandoned'],
//     default: 'active'
//   },
//   lastActive: {
//     type: Date,
//     default: Date.now
//   }
// }, {
//   timestamps: true,
//   toJSON: {
//     transform: function(doc, ret) {
//       ret.id = ret._id;
//       delete ret._id;
//       delete ret.__v;
//       return ret;
//     }
//   }
// });

// // Update totals before saving
// cartSchema.pre('save', function(next) {
//   if (this.isModified('items')) {
//     this.totalItems = this.items.length;
//     this.subTotal = this.items.reduce((sum, item) => {
//       return sum + (item.price * (item.quantity || 1));
//     }, 0);
    
//     // Apply discount (20%)
//     this.discount = this.subTotal * 0.2;
//     this.shipping = 0; // Free shipping
//     this.totalAmount = this.subTotal - this.discount;
    
//     this.lastActive = new Date();
//   }
//   next();
// });

// export default mongoose.models.Cart || mongoose.model('Cart', cartSchema);


// import mongoose from 'mongoose';

// const cartItemSchema = new mongoose.Schema({
//   productId: { type: String, required: true },
//   templateId: { type: String, required: true },
//   kind: { type: String, enum: ['classic', 'server'], required: true },
//   quantity: { type: Number, default: 1, min: 1 },
  
//   // User Personal Data
//   data: {
//     name: String,
//     title: String,
//     company: String,
//     email: String,
//     phone: String,
//     website: String,
//     address: String,
//     logo: String,
//     cardType: String,
//     paperType: String
//   },
  
//   // ✅ Design & Style Data (Database me save hoga)
//   selectedFont: { type: String, default: 'Arial, sans-serif' },
//   fontSize: { type: Number, default: 16 },
//   textColor: { type: String, default: '#000000' },
//   accentColor: { type: String, default: '#0ea5e9' },
  
//   // Pricing
//   price: { type: Number, required: true, min: 0 },
  
//   // ✅ Images (Front & Back URLs / Base64 Data)
//   frontImageUrl: { type: String, default: null }, // Yahan URL save hoga
//   backImageUrl: { type: String, default: null },  // Yahan URL save hoga
//   thumbnailUrl: { type: String, default: null },

//   // ✅ Detailed Design Positions (Drag & Drop data)
//   design: {
//     positions: {
//       name: { x: Number, y: Number },
//       title: { x: Number, y: Number },
//       company: { x: Number, y: Number },
//       logo: { x: Number, y: Number }
//     },
//     sizes: {
//       name: Number,
//       title: Number,
//       company: Number,
//       logo: Number
//     },
//     positionsBack: {
//       email: { x: Number, y: Number },
//       phone: { x: Number, y: Number },
//       website: { x: Number, y: Number },
//       address: { x: Number, y: Number },
//       qr: { x: Number, y: Number }
//     },
//     backSizes: {
//       email: Number,
//       phone: Number,
//       website: Number,
//       address: Number,
//       qr: Number
//     },
//     isEditLayout: { type: Boolean, default: false },
//     qrColor: { type: String, default: '#000000' },
//     qrLogoUrl: String,
//     qrData: String
//   },

//   // Server Template Meta (if using server templates)
//   serverMeta: {
//     name: String,
//     background_url: String,
//     back_background_url: String,
//     config: mongoose.Schema.Types.Mixed,
//     qrColor: String,
//     qrLogoUrl: String
//   },
  
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now }
// });

// const cartSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//     index: true
//   },
//   items: [cartItemSchema], // Array of items
//   status: {
//     type: String,
//     enum: ['active', 'checkout', 'purchased', 'abandoned'],
//     default: 'active'
//   },
//   lastActive: { type: Date, default: Date.now }
// }, {
//   timestamps: true
// });

// // Calculate totals automatically
// cartSchema.pre('save', function(next) {
//   if (this.isModified('items')) {
//     this.lastActive = new Date();
//   }
//   next();
// });

// export default mongoose.models.Cart || mongoose.model('Cart', cartSchema);

import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema({
  // IDs
  id: { type: String, required: true }, // Client side ID
  productId: { type: String }, // Optional linkage
  kind: { type: String, enum: ['classic', 'server'], required: true },
  
  // User Details (Name, Phone, etc.)
  data: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },

  // Pricing
  price: { type: Number, default: 0 },
  quantity: { type: Number, default: 1 },

  // ✅ NEW: Image URLs (Ye missing thay, ab save honge)
  frontImageUrl: { type: String, default: "" },
  backImageUrl:  { type: String, default: "" },
  thumbnailUrl:  { type: String, default: "" },

  // Design Configuration (Positions, Sizes) - Aapke dump ke hisaab se
  frontData: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  backData: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },

  // Server Template Specifics
  serverMeta: {
    name: String,
    background_url: String,
    back_background_url: String,
    config: mongoose.Schema.Types.Mixed,
    qrColor: String,
    qrLogoUrl: String
  },

  // Styles
  selectedFont: { type: String, default: 'Arial, sans-serif' },
  fontSize: { type: Number, default: 16 },
  textColor: { type: String, default: '#000000' },
  accentColor: { type: String, default: '#0ea5e9' },

}, { _id: false }); // Item ka alag _id nahi chahiye agar zaroorat nahi hai

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  items: [cartItemSchema],
  status: { type: String, default: 'active' },
  lastActive: { type: Date, default: Date.now }
}, {
  timestamps: true
});

export default mongoose.models.Cart || mongoose.model('Cart', cartSchema);