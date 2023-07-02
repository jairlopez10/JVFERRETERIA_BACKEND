import Administrador from "../models/Administrador.js";
import generarjwt from "../helpers/generarjwt.js";

const autenticaradmin = async (req, res) => {

    const { email, password } = req.body;

    const usuario = await Administrador.findOne({email});

    if(!usuario){
        const error = new Error('No es un administrador');
        return res.status(400).json({msg: error.message});
    }

    if (await usuario.comprobarpassword(password)){

        //Autenticado este usuario
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarjwt(usuario._id)
        });
    } else {
        const error = new Error('Password incorrecto')
        return res.status(400).json({msg: error.message});
    }
}

const obtenerperfil = (req, res) => {

    const { administrador } = req;

    res.json(administrador);
}

//No se esta usando actualmente, pero se creo por si el proyecto crece
const registraradmin = async (req, res) => {

    const { email } = req.body;

    //Verificar que no exista ya
    const existeadmin = await Administrador.findOne({email: email});

    if (existeadmin){
        const error = new Error('Ya existe este usuario');
        return res.status(400).json({msg: error.message});
    }

    //Registrar un nuevo admin
    try {
        const administrador = new Administrador(req.body);
        const adminguardado = await administrador.save();
        res.json(adminguardado);
    } catch (error) {
        console.log(error);
    }
}

export {
    autenticaradmin,
    registraradmin,
    obtenerperfil
}