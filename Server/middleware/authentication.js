const {verifyToken} = require('../helpers/jwt')
const { User } = require ('../models/index')

const authentication = async ( req,res,next ) => {
    const { access_token } = req.headers
    try {
        if(!access_token) {
            throw { name : "InvalidToken"}
        }

        const payload = verifyToken(access_token)
        const user = await User.findByPk(payload.id)
        req.loggedIn = user 
        next()
    } catch (error) {
        next (error)
    }
}

module.exports = {authentication}