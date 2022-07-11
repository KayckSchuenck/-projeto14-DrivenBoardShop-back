import joi from 'joi'
import bcrypt from 'bcrypt'
import db from "../db.js"
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
import dayjs from 'dayjs'
import {MongoObject, ObjectId} from 'mongodb'

dotenv.config()

export async function sign_up(req,res) {
    try{
        const schemaUsuarios=joi.object({
            name:joi.string().required(),
            email:joi.string().email().required(),
            password:joi.string().required()
        })
        const validation=schemaUsuarios.validate(req.body)
        if(validation.error){
            res.sendStatus(422)
            return
        }
        const {name,email,password}=req.body
        const checkUser=await db.collection("usuarios").findOne({email})
        if(checkUser){
            res.status(409).send("Usuario já cadastrado ou senha conflitante")
            return
        }
        const hashPassword=bcrypt.hashSync(password, 10);
        await db.collection("usuarios").insertOne({name,email,hashPassword})
        res.sendStatus(201)
    } catch(e){
        res.status(500).send("Erro com o servidor")
        console.log(e)
    }
}

export async function login(req,res) {
    try{
        const schemaUsuarios=joi.object({
            email:joi.string().email().required(),
            password:joi.string().required()
        })
        const validation=schemaUsuarios.validate(req.body)
        if(validation.error){
            res.sendStatus(422)
            return
        }
        const {email,password}=req.body
        const user=await db.collection("usuarios").findOne({email})
        if(user && bcrypt.compareSync(password, user.hashPassword)){
            const {_id }=user
            const dados={userId:new ObjectId(_id)}
            const chaveSecreta = process.env.JWT_SECRET;
            const configuracoes = { expiresIn: 60*60*24 }
            const token = jwt.sign(dados, chaveSecreta,configuracoes);
            await db.collection("sessoes").insertOne({token,date:dayjs().format('DD/MM-HH:mm')})
            res.send({name:user.name,token})
        } else{
            res.sendStatus(401)
            return
        }
    } catch(e){
        res.status(500).send("Erro com o servidor")
        console.log(e)
    }
}