import Pedidos from "../models/Pedidos.js";
import enviaremailpedido from "../helpers/emailpedido.js";

const obtenerproductos = (req, res) => {
    res.json({ msg: 'Recopilando productos'});
}

const obtenerpedidos = async (req, res) => {
    
    try {
        const pedidos = await Pedidos.find().where('administrador').equals(req.administrador.email);
        res.json(pedidos);
    } catch (error) {
        return res.status(400).json({msg: error.message});
    }
    
}

const crearpedido = async (req, res) => {

    const { email, telefono, nombre, ciudad, direccion, items, total, comentarios_cliente } = req.body;

    if([email, telefono].includes('')){
        const error = new Error('Email y telefono son campos obligatorios');
        return res.status(400).json({msg: error.message});
    }

    try {
        const pedido = new Pedidos(req.body);
        const pedidoguardado = await pedido.save();

        //Enviar email
        enviaremailpedido({
            email,
            nombre,
            ciudad,
            direccion,
            items,
            total,
            comentarios_cliente
        });

        res.json(pedidoguardado);

    } catch (error) {
        return res.status(400).json({msg: error.message})
    }

}

const actualizarpedido = async (req, res) => {

    const { id } = req.params;

    const {nombre, apellido, email, telefono, empresa, ciudad, direccion, items, total, status, comentarios_jv, fecha, descuento} = req.body;

    if ([email, telefono].includes('')){
        return req.json({msg: 'Email y telefono son campos obligatorios'});
    }

    try {
        const pedido = await Pedidos.findById(id);

        if(!pedido){
            return res.json({msg: 'Pedido no encontrado'});
        }

        pedido.nombre = nombre;
        pedido.apellido = apellido;
        pedido.email = email;
        pedido.telefono = telefono;
        pedido.empresa = empresa;
        pedido.ciudad = ciudad;
        pedido.direccion = direccion;
        pedido.items = items;
        pedido.total = total || pedido.total;
        pedido.status = status;
        pedido.comentarios_jv = comentarios_jv;
        pedido.fecha = fecha || pedido.fecha;
        pedido.descuento = descuento;

        const pedidoguardado = await pedido.save();
        res.json(pedidoguardado);
    } catch (error) {
        return res.status(400).json({msg: error.message});
    }

}

const eliminarpedido = async (req, res) => {

    const { id } = req.params;
    
    try {
        const pedido = await Pedidos.findById(id);

        if(!pedido){
            const error = new Error('Pedido no encontrado');
            return res.status(400).json({msg: error.message});
        }

        if(pedido.administrador !== req.administrador.email){
            return res.status(400).json({msg: 'Accion no valida'});
        }

        await pedido.deleteOne();
        res.json({msg: 'Paciente eliminado'})

    } catch (error) {
        console.log(error);
    }

}


export {
    actualizarpedido,
    obtenerpedidos,
    obtenerproductos,
    crearpedido,
    eliminarpedido
}