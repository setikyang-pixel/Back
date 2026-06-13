import prisma from "../config/db.js";
import { hashPassword, verifyPassword } from "../utils/hashPassword.js";
import { createJWT, verifyJWT } from "../utils/jwt.js";
import "dotenv/config";

const meControler = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        error: "No token provided",
      });
    }
    const user = verifyJWT(token);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Bad request for your email!!!" });
  }
};

const registerControler = async (req, res) => {
  try {
    const result = req.body;
    const hashing = await hashPassword(result.password);
    const allUser = await prisma.usersLogin.create({
      data: { ...result, password: hashing },
    });
    res.json("Great response.");
  } catch (error) {
    res.status(500).json({ error: "Bad request!!!" });
  }
};

const loginControler = async (req, res) => {
  try {
    const result = req.body;
    const myUser = await prisma.usersLogin.findUnique({
      where: {
        email: result.email,
      },
    });
    if (!myUser)
      throw new Error(
        "The person with the given email address was not found!!!",
      );
    const isMatch = await verifyPassword(result.password, myUser.password);
    if (!isMatch)
      return res.status(401).json({
        error: "Invalid credentials",
      });
    const token = createJWT({
      id: myUser.id,
      name: myUser.name,
      email: myUser.email,
      role: myUser.role,
      created_at: myUser.created_at,
    });
    req.user = myUser.id;
    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    
    res.json("Great response.");
  } catch (error) {
    res.status(500).json({ error: "Bad request for email!!!" });
  }
};

export { loginControler, registerControler, meControler };
