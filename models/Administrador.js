import mongoose from "mongoose";
import bcrypt from "bcrypt";

const adminschema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellido: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        default: null,
        trim: true
    },
    token: {
        type: String,
        default: null,
    }
})

//Hashea el password antes de guardarlo en la bd
adminschema.pre('save', async function(next) {
    
    if (!this.isModified("password")){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

adminschema.methods.comprobarpassword = async function(passwordformulario) {
    return await bcrypt.compare(passwordformulario, this.password);
}

const Administrador = mongoose.model("Administrador", adminschema);

export default Administrador;