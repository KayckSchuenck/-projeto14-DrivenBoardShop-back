import {Router} from 'express';
import {getProdutos, getSkate, getLongs, getPecas, getProduto} from '../controllers/productControllers.js'

const productRoute = Router();


productRoute.get('/produtos', getProdutos);
productRoute.get('/produtos/skate', getSkate);
productRoute.get('/produtos/longs',getLongs);
productRoute.get('/produtos/pecas',getPecas);
productRoute.get('/produtos/:idProduto', getProduto);

export default productRoute;