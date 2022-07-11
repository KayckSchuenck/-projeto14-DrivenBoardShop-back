import {Router} from 'express';
import {getProdutos, getProduto, getCategorias} from '../controllers/productControllers.js'

const productRouter = Router();


productRouter.get('/produtos', getProdutos);
productRouter.get('/produtos/categorias/:categoria', getCategorias);
productRouter.get('/produtos/:idProduto', getProduto);


export default productRouter;