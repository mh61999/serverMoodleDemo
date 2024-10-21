import Jwt from "jsonwebtoken";
import Users from '../Models/Users.js'

export const cookieJwtAuth = async (req, res, next) => {
    const token = req.cookies.token;
    try {
        console.log("auth")
        const id = Jwt.verify(token, process.env.ACCESS_TOKEN)
        await Users.findById(id.userid).then(e => {
            req.auth = e.authRank
            req.id = id.userid;
            next();
        })
            .catch(c => {
                console.log(er)
            })
    }
    catch (Err) {
        console.log(Err)
        console.log('provoked')
        res.clearCookie('token');
        return res.status(200).json({
            status: 0
        })
    }
}
