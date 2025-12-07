import express from 'express';
import Cart from '../models/Cart.js';
import { authRequired } from '../middleware/auth.js';

const router = express.Router();

// Get user's cart
router.get('/', authRequired, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user._id });  // Changed from req.user.id to req.user._id
    if (!cart) {
      cart = new Cart({ userId: req.user._id, items: [] });  // Changed from req.user.id to req.user._id
      await cart.save();
    }
    res.json(cart.items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update user's cart
router.put('/', authRequired, async (req, res) => {
  try {
    const { items } = req.body;
    let cart = await Cart.findOne({ userId: req.user._id });  // Changed from req.user.id to req.user._id
    
    if (!cart) {
      cart = new Cart({ userId: req.user._id, items });  // Changed from req.user.id to req.user._id
    } else {
      cart.items = items;
    }
    
    await cart.save();
    res.json(cart.items);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;