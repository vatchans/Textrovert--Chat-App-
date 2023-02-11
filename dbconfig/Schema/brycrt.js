const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const SALT = 10
const secret = "ytdytf@$#^%*GYUFTDERSAW79"
const hashPassword = async (password) => {
    let salt = await bcrypt.genSalt(SALT)
    let hash = await bcrypt.hash(password, salt)
    return hash
}
const validate = async (password, hashPassword) => {
    return bcrypt.compare(password, hashPassword)
}
const Createtoken = async (payload) => {
    let token = await jwt.sign(payload, secret, { expiresIn: '1d' })
    return token
}
const Decodetoken = async (token) => {
    let decode = await jwt.decode(token)
    return decode
}
const Tokenvalidate = async (req, res, next) => {
    if (req.headers.authorization) {
        let token = req.headers.authorization.split(' ')[1]
        let data = await Decodetoken(token)
        if (Math.round(Date.now() / 1000) <= data.exp) {
        next()
        }
else
        res.status(401).send({ message: "token expired" })
}
 

    else {
    res.status(400).send({ message: "token not found" })
}
}
module.exports = { hashPassword, validate, Createtoken, Decodetoken, Tokenvalidate }