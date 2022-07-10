import { Router } from "express";
import { validateCheckout } from "../middlewares/userMiddleware.js";
import {postCart} from "../controllers/userControllers.js";
import {checkout} from '../controllers/userControllers.js'

const userRouter=Router()

userRouter.post('/produtos',postCart)
userRouter.post('/confirmacao',validateCheckout,checkout)

export default userRouter