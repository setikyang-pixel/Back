import {registerHandler,loginHandler,logoutHandler,Me} from "../controllers/auth.controller"
import express from "express"
let rout = express.Router()

rout.post("/api/auth/register",registerHandler)
rout.post("/api/auth/login",loginHandler)
rout.post("/api/auth/logout",logoutHandler)
rout.get("/api/auth/me",Me)