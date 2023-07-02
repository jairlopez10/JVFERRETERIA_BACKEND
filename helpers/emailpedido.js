import nodemailer from 'nodemailer';

const enviaremailpedido = async (datos) => {

    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD
        }
    });

    const { email, nombre, items, total, ciudad, direccion, comentarios_cliente } = datos;

    let itemshtml = '';
    
    items.forEach(item => {
        itemshtml = `<p>Producto: ${item.titulo}    Cantidad: ${item.cantidad} ${item.unidad}  Subtotal: $${item.precio*item.cantidad} </p>` + itemshtml;
    });
    
    //Envia email al cliente
    const mailcliente = await transporter.sendMail({
        from: '"J&V Ecommerce" <j&vecommerce@gmail.com>',
        to: email,
        subject: 'Pedido recibido J&V',
        text: 'Pedido recibido J&V',
        html: `<h1>Pedido Recibido J&V</h1>
        <p>Hola ${nombre}! Acabamos de recibir tu pedido para entregar en ${direccion} de la ciudad de ${ciudad} con los siguientes productos: </p>
        <div>${itemshtml}</div>
        <h3>Total: $${total}</h3>
        <h2>Metodos de pago</h2>
        <p>Por medio de Bancolombia a traves de una transaccion a cuenta de ahorros</p>
        <p>Por medio de Nequi</p>
        <p>Contraentrega</p>
        `
    })

    //Envia email al administrador
    const mailadministrador = await transporter.sendMail({
        from: '"J&V Ecommerce" <j&vecommerce@gmail.com>',
        to: 'lopezarias7@gmail.com',
        subject: 'Pedido recibido J&V',
        text: 'Pedido recibido J&V',
        html: `<h1>Pedido Recibido J&V</h1>
        <p>Hola Luz Mery, ${nombre} acaba de realizar un pedido para entregar en ${direccion} de la ciudad de ${ciudad} con los siguientes productos: </p>
        <div>${itemshtml}</div>
        <h3>Total: $${total}</h3>
        <p>Comentarios Cliente: ${comentarios_cliente}</p>
        `
    })

    

}

export default enviaremailpedido;