import {Router} from 'express';
import {getProdutos, getSkate, getLongs, getPecas, getProduto} from '../controllers/productControllers.js'

const productRouter = Router();


productRouter.get('/produtos', getProdutos);
productRouter.get('/produtos/skate', getSkate);
productRouter.get('/produtos/longs',getLongs);
productRouter.get('/produtos/pecas',getPecas);
productRouter.get('/produtos/:idProduto', getProduto);


export default productRouter;