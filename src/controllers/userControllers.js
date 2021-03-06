import db from '../db.js'
import joi from 'joi'

export async function postCart(req,res) {
    const cartSchema=joi.array().min(1).items(joi.object({
        qtd:joi.number().required(),
        idProduto:joi.number().required()
    }))
    const validation=cartSchema.validate(req.body)
    if(validation.error) return res.status(422).send("Nenhum produto no carrinho")
    const arrayProdutos=req.body
    const cartProducts=[]
    let valor=0
    try{
        await Promise.all(arrayProdutos.map(async elem=>{
            const produto= await db.collection("produtos").findOne({idProduto:elem.idProduto})
            valor+=produto.valor*elem.qtd
            cartProducts.push(produto)
        }))
        res.send({produtos:cartProducts,valor})
    } catch(e){
        res.status(500).send("Produto não encontrado, tente novamente")
        console.log(e)
    }
}

export async function checkout(req,res) {
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
        await Promise.all(produtos.map(async elem=>{
            const product= await db.collection("produtos").findOne({idProduto:elem.idProduto})
            if(product.qtd<elem.qtd){
                invalidos+=`${product.nomeProduto}-`
            }
            if(invalidos===''){
                valor+=product.valor*product.qtd
            }
        }))
        if(invalidos==='') {
            await db.collection('confirmados').insertOne({endereco,idUser,produtos,valor})
            produtos.map(async elem=>{
                await db.collection("produtos").updateOne({ idProduto:elem.idProduto },
                { $inc:{ qtd:-elem.qtd } })
            })
            return res.sendStatus(200)
        } else return res.status(401).send(`Não há estoque suficiente do(s) produto(s): ${invalidos}, por favor diminua a quantidade e tente novamente`)
    } catch(e){
        res.status(500).send("Produto não encontrado, tente novamente")
    }
}