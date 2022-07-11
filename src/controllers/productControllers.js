import db from '../db.js';

export async function getProdutos(req, res){
    
    try{
        
        const produtos = await db.collection('produtos').find({}).toArray();
        res.status(200).send(produtos);

    }catch(error){
        res.status(500).send("Erro com o servidor")
        console.log(error);
    }
}



export async function getCategorias(req, res){
    const {categoria}=req.params
    try{
        
        const produtos = await db.collection('produtos').find({ categoria }).toArray();
        

        res.status(200).send(produtos);

    }catch(error){
        res.status(500).send("Erro com o servidor")
        console.log(error);
    }
}


export async function getProduto(req, res){
    
    const { idProduto } = req.params;
    
    try{
        
        const produto = await db.collection('produtos').findOne({ idProduto: parseInt(idProduto) })
        

        res.status(200).send(produto);

    }catch(error){
        res.status(500).send("Erro com o servidor")
        console.log(error);
    }
}

// export async function setProduto(req, res){

//     console.log(req.body);
//     res.send(req.body);
    
//     const promise = db.collection('produtos').insertOne(req.body);
//     promise.then((response)=>{

//         res.status(201).send(response.data);
//     })

//     promise.catch(err => res.status(500).send(err))
// }