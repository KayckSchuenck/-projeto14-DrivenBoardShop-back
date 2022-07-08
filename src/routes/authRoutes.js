import { Router } from "express";
import { sign_up,login } from "../controllers/authControllers.js"

const authRouter=Router()

authRouter.post('/sign-up',sign_up)
authRouter.post('/login',login)

export default authRouter