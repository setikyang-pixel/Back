import jwt from "jsonwebtoken";
import obj from "../config/env.js";


const signToken = (payload) =>jwt.sign( payload , obj.JWT_SECRET,{expiresIn : obj.JWT_EXPIRES});
const verifyToken = (token) => jwt.verify(token, obj.JWT_SECRET);
export {signToken,verifyToken} 
