import prisma from "../config/db.js";
import express from "express";
import { verifyJWT } from "../utils/jwt.js";

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
    const userId = +verifyJWT(req.cookies.token).id;
    const { productId, quantity } = req.body;
    if (!productId || !quantity) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    const cartGet = await prisma.cart.upsert({
      where: { userId: +userId },
      update: {},
      create: { userId: +userId },
    });
    const result = await prisma.cartItems.upsert({
      where: {
        cartId_productId: {
          cartId: cartGet.id,
          productId: +productId,
        },
      },
      update: {
        quantity: { increment: +quantity },
      },
      create: {
        cartId: cartGet.id,
        productId: +productId,
        quantity: +quantity,
      },
    });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Bad request!!!" });
  }
};

const updateCartItem = async (req, res) => {
  try {
    const id = +req.params.id;
    const userId = req.body.userId || req.user.id;
    const quantity = +req.body.quantity;
    const item = await prisma.cartItems.findUnique({
      where: { id: id },
      include: {
        cart: true,
      },
    });
    if (!item) {
      return res.status(404).json({
        error: "Cart item not found",
      });
    }
    if (item.cart.userId !== userId) {
      return res.status(403).json({
        error: "Forbidden",
      });
    }
    const cartUpd = await prisma.cart.update({
      where: { id },
      data: { quantity: quantity },
    });
    res.status(201).json(cartUpd);
  } catch (error) {
    res.status(500).json({
      error: err.message,
    });
  }
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
