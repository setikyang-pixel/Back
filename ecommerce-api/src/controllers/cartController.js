import prisma from "../config/db.js";
import express from "express";

const getCart = async (req, res) => {
  try {
    const id = +req.params.id;
    const prod = await prisma.product.findUnique({
      where: { id: id },
    });
    if (!prod) return res.status(404).send("No product!!!");
    res.status(200).json(prod);
  } catch (err) {
    res.status(500).json({ error: "Bad request!!!" });
  }
};

const addToCart = async (req, res) => {
  try {
  } catch (error) {
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
