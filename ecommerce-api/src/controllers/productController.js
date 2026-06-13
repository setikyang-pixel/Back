import prisma from "../config/db.js";

const getAllProducts = async (req, res) => {
  try {
    const prod = await prisma.product.findMany();
    if (!prod.length) return res.status(401).send("No products!!!");
    res.status(200).json(prod);
  } catch (err) {
    res.status(500).json({ error: "Bad request!!!" });
  }
};

const getProductById = async (req, res) => {
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

const createProduct = async (req, res) => {
  try {
    const { categoryIds, ...productData } = req.body;
    const user = await prisma.product.create({
      data: {
        ...productData,
        price: +productData.price,
        stock: +productData.stock,
        productCategories: {
          create: categoryIds
            ? categoryIds.map((id) => ({
                categoryId: Number(id),
              }))
            : [],
        },
      },
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: "Bad request!!!" });
  }
};

const updateProduct = async (req, res) => {
  try {
    const id = +req.params.id;
    const { categoryIds, ...productData } = req.body;
    const prod = await prisma.product.update({
      where: { id: id },
      data: {
        ...productData,
        productCategories: categoryIds
          ? {
              deleteMany: {},
              create: categoryIds.map((i) => ({ categoryId: +i })),
            }
          : undefined,
      },
    });
    res.status(200).json(prod);
  } catch (err) {
    res.status(500).json({ error: "Bad request!!!" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = +req.params.id;
    await prisma.product.delete({
      where: {
        id: id,
      },
    });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: "Bad request!!!" });
  }
};

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
