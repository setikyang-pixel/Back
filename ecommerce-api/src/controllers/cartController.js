import prisma from "../config/db.js";
import express from "express";

const getCart = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId)
      return res.status(400).json({ error: "Missing required fields!!!" });
    const userCart = await prisma.cart.findUnique({
      where: { userId: userId },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    });
    if (!userCart) {
      return res
        .status(404)
        .json({ message: "Cart is empty or does not exist" });
    }
    res.status(200).json(userCart);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;
    return res.status(400).json({ error: "Missing required fields" });
    const result = await prisma.cartItems.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: productId,
        },
      },
    });

    const cartGet = await prisma.cart.upsert({
      where: { userId: +userId },
      update: {},
      create: { userId: +userId },
    });
    // cosnt cartItem = prisma.cartItems.upsert({

    // })
    res.status(200).json(prod);
  } catch (err) {
    res.status(500).json({ error: "Bad request!!!" });
  }
};

const updateCartItem = async (req, res) => {
  res.json({ message: "updateCartItem", id: req.params.id, item: req.body });
};

const removeFromCart = async (req, res) => {
  try {
    const id = +req.params.id;
    await prisma.cartItems.delete({
      where: { id: id },
    });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: "Bad request!!!" });
  }
};

export { getCart, addToCart, updateCartItem, removeFromCart };
