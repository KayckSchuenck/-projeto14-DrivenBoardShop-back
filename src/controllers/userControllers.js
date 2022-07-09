import db from '../db.js'
import joi from 'joi'

export default async function postCart(req,res) {
    const cartSchema=joi.array().items({
        qtd:joi.number().required(),
        idProduto:joi.number().required()
    })
    const validation=cartSchema.validate(req.body)
    if(validation.error) return res.sendStatus(422)
    const arrayProdutos=req.body
    const cartProducts=[]
    let valor=0
    try{
        arrayProdutos.map(async elem=>{
            const produto= await db.collection("produtos").find({idProduto:elem.idProduto})
            valor+=produto.valor*elem.qtd
            cartProducts.push(produto)
        })
        res.send({produtos:cartProducts,valor})
    } catch(e){
        res.status(500).send("Produto não encontrado, tente novamente")
    }
}

export default async function checkout(req,res) {
    const checkoutSchema=joi.object({
        endereco:joi.object().required(),
        produtos:joi.array().min(1).required()
    })
    const validation=checkoutSchema.validate(req.body)
    if(validation.error) return res.sendStatus(422)
    const {endereco,produtos}=req.body
    const idUser=res.locals.id
    let invalidos=''
    let valor=0
    try{
        produtos.map(async elem=>{
            const product= await db.collection("produtos").find({idProduto:elem.idProduto})
            if(product.qtd<elem.qtd){
                invalidos+=`${product.nomeProduto},`
                return
            }
            if(invalidos===''){
                valor+=product.valor*product.qtd
            }
        })
        if(invalidos==='') {
            await db.collection('confirmados').insertOne({endereco,idUser,produtos,valor})
            produtos.map(async elem=>{
                await db.collection("produtos").updateOne({ idProduto:elem.idProduto },
                { $inc:{ qtd:-elem.qtd } })
            })
        }
        else return res.status(401).send(`Não há estoque suficiente do(s) produto(s): ${invalidos}, por favor diminua a quantidade e tente novamente`)
    } catch(e){
        res.status(500).send("Produto não encontrado, tente novamente")
    }
}