import express from "express";
import { autenticaradmin, registraradmin, obtenerperfil } from "../controllers/administradorcontroller.js";
import checkauth from "../middlewares/authmiddleare.js";

const router = express.Router();

//Area publica
router.post('/login', autenticaradmin);
router.post('/registrar', registraradmin);

//Area privada
router.get('/perfil', checkauth, obtenerperfil);


export default router;