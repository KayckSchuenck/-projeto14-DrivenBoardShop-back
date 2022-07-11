import db from '../db.js'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export async function validateCheckout(req,res,next){
    const {authorization}=req.headers
    const token = authorization?.replace("Bearer ", "").trim()
    if(!token) return res.status(401).send("Token inválido, faça login novamente")
    const chaveSecreta = process.env.JWT_SECRET;
    try{
        const {userId} = jwt.verify(token, chaveSecreta);
        console.log(userId)
        const session = await db.collection("sessoes").findOne({ token })
        if (!session) return res.status(401).send("Usuário não encontrado, faça login novamente")
        const user = await db.collection("usuarios").findOne({ 
            _id: userId
        })
        if(!user) return res.status(404).send("Usuário não encontrado, faça seu cadastro")
        res.locals.id=user._id
        next()
    } catch(e){
        res.status(401).send("Token inválida ou expirada")
    }
   
}