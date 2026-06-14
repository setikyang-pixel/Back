import prisma from "../config/db.js";
import { verifyJWT } from "../utils/jwt.js";

const getAllOrders = async (req, res) => {
  try {
    const userId = verifyJWT(req.cookies.token);
    const str = userId.role.toLowerCase();
    let orders;
    if (str === "admin") {
      orders = await prisma.order.findMany({
        include: { orderItems: true },
      });
    } else {
      orders = await prisma.order.findMany({
        where: { userId: userId.id },
        include: { orderItems: true },
      });
    }
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Bad request!!!" });
  }
};

const getOrderById = async (req, res) => {
  try {
    const orderId = +req.params.id;
    const userId = verifyJWT(req.cookies.token);
    const str = userId.role.toLowerCase();
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { orderItems: true },
    });
    if (!order) {
      return res.status(404).json({ error: "Order not found!!!" });
    }
    if (order.userId !== userId && str !== "admin") {
      return res.status(403).json({ error: "Forbidden!!!" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ error: "Bad request!!!" });
  }
};

const createOrder = async (req, res) => {
  try {
    const { id: userId } = verifyJWT(req.cookies.token);
    const cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        cartItems: {
          include: {
            product: true,
          },
        },
      },
    });
    if (!cart || cart.cartItems.length === 0) {
      return res.status(400).json({
        error: "Cart is empty",
      });
    }
    const total = cart.cartItems.reduce((sum, item) =>  sum + +item.product.price * item.quantity, 0)

    const order = await prisma.order.create({
      data: {
        userId,
        total,
      },
    });
    await prisma.orderItem.createMany({
      data: cart.cartItems.map((item) => ({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
        priceAtPurchase: item.product.price,
      })),
    });
    await prisma.cartItems.deleteMany({
      where: {
        cartId: cart.id,
      },
    });

    res.status(201).json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err.message,
    });
  }
};
const updateOrder = async (req, res) => {
  try {
    const orderId = +req.params.id;
    const updateData = req.body.quantity;
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });
    const str = order.role.toLowerCase();
    let UpdOrder;
    if (str == "admin") {
      UpdOrder = await prisma.order.update({
        where: { id: orderId },
        data: updateData,
      });
    }
    res.status(200).json(UpdOrder || "No result!");
  } catch (error) {
    res.status(500).json({ error: "Bad request!!!" });
  }
};

export { getAllOrders, getOrderById, createOrder, updateOrder };
