import jwt from "jsonwebtoken";

const generarjwt = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })
}

export default generarjwt;