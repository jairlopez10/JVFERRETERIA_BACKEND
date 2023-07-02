import mongoose from "mongoose";

const pedidosschema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellido: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    telefono: {
        type: String,
        required: true
    },
    empresa: {
        type: String,
        trim: true
    },
    ciudad: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    items: {
        type: Array,
        required: true,
        default: null
    },
    total: {
        type: String,
        default: null
    },
    status: {
        type: String,
        default: 'recibido'
    },
    comentarios_cliente: {
        type: String,
        trim: true
    },
    comentarios_jv: {
        type: String,
        trim: true,
        default: null
    },
    fecha: {
        type: Date,
        required: true,
        default: Date.now()
    },
    descuento: {
        type: String,
        default: null
    },
    administrador: {
        type: String,
        default: 'correo@correo.com'
    }
});

const Pedidos = mongoose.model('Pedidos', pedidosschema);

export default Pedidos;