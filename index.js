import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
import conectardb from "./config/db.js";
import administradorroutes from "./routes/administradorroutes.js";
import pedidosroutes from "./routes/pedidosroutes.js";

const app = express();
//Esto le permite leer a node y se le dice que se enviaran de express archivos json de respuesta
app.use(express.json());

//Este permite que revise en la carpeta .env para leer las variables
dotenv.config();

conectardb();

const dominiospermitidos = [process.env.FRONTEND_URL]

const coroptions = {
    origin: function(origin, callback) {
        if (dominiospermitidos.indexOf(origin) !== -1){
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    }
}

app.use(cors(coroptions));

app.use("/api/administrador", administradorroutes);
app.use("/api/pedidos", pedidosroutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log('El servidor esta funcionando desde el puerto 4000');
})