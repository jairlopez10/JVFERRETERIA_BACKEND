import express from 'express';
import checkauth from '../middlewares/authmiddleare.js';
import { actualizarpedido, obtenerpedidos, obtenerproductos, crearpedido, eliminarpedido } from '../controllers/pedidoscontroller.js';
import enviaremailcontacto from '../helpers/emailcontactanos.js';

const router = express.Router();


//Area publica
router.post('/crear-pedido', crearpedido);
router.post('/contactanos', enviaremailcontacto);

//Area privada
router.get('/', checkauth, obtenerpedidos);
router.put('/:id', checkauth, actualizarpedido);
router.delete('/:id', checkauth, eliminarpedido);
router.get('/productos', checkauth, obtenerproductos);


export default router;