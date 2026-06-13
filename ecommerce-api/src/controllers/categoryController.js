import prisma from "../config/db.js";

const getAllCategories = async (req, res) => {
  try {
    const categories = await prisma.category.findMany();
    if (!categories.length) return res.status(401).send("No categories!!!");
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: "Bad request!!!" });
  }
};

const createCategory = async (req, res) => {
  try {
    const result = req.body;
    console.log(result);
    const categories = await prisma.category.create({
      data: result,
    });
    console.log(categories);
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Bad request!!!" });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const id = +req.params.id;
    const prod = await prisma.category.delete({
      where: { id: id },
    });
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json({ error: "Bad request!!!" });
  }
};

export { getAllCategories, createCategory, deleteCategory };
