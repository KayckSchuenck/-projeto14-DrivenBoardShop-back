import db from '../db.js';

export async function getProdutos(req, res){
    
    try{
        
        const produtos = await db.collection('produtos').find({}).toArray();
        
        if(produtos.length === 0){

            res.status(200).send("nenhum produto cadastrado ainda");
            return;
        }

        res.status(200).send(produtos);

    }catch(error){
        res.status(500).send("Erro com o servidor")
        console.log(error);
    }
}

export async function getSkate(req, res){
    
    try{
       
        const produtos = await db.collection('produtos').find({ categoria: 'skate' }).toArray();
        
        if(produtos.length === 0){

            res.status(200).send("nenhum produto dessa categoria cadastrado ainda");
            return;
        }

        res.status(200).send(produtos);

    }catch(error){
        res.status(500).send("Erro com o servidor")
        console.log(error);
    }
}

export async function getLongs(req, res){
    
    try{
        
        const produtos = await db.collection('produtos').find({ categoria: 'longboard' }).toArray();
        
        if(produtos.length === 0){

            res.status(200).send("nenhum produto dessa categoria cadastrado ainda");
            return;
        }

        res.status(200).send(produtos);

    }catch(error){
        res.status(500).send("Erro com o servidor")
        console.log(error);
    }
}

export async function getPecas(req, res){
    
    try{
        
        const produtos = await db.collection('produtos').find({ categoria: 'pecas' }).toArray();
        
        if(produtos.length === 0){

            res.status(200).send("nenhum produto dessa categoria cadastrado ainda");
            return;
        }

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
        
        if(produto.length === 0){

            res.status(200).send("nenhum produto encontrado");
            return;
        }

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