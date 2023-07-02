import nodemailer from 'nodemailer';

const enviaremailcontacto = async (req, res) => {

    let transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    const {nombre, email, telefono, mensaje} = req.body;

    try {
        const mailcliente = await transporter.sendMail({
            from: 'J&V Ecommerce <j&vecommerce@gmail.com>',
            to: email,
            subject: 'New Contact Form',
            text: 'New Contact Form',
            html: `
                <h2>New Contact Form Fulfillment</h2>
                <p>Name: ${nombre}</p>
                <p>Email: ${email}</p>
                <p>Telefono: ${telefono}</p>
                <p>Mensaje: ${mensaje}</p>
            `
        })
        res.json({msg: 'Enviado correctamente, gracias!'})
    } catch (error) {
        res.status(400).json({msg: error.response, error: true});
    }
    
}  

export default enviaremailcontacto;