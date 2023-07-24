const {User} = require("../models")
const { compare } = require ('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class userController {
    static async register ( req, res, next) {
        try {
            const { email , password } = req.body
            const user = await User.create({
                email , password
            })
            console.log(user);
            res.status(201).json("Register Success")
        } catch (error) {
            next(error)
        }
    }
    static async login ( req,res,next){
        try {
            const { email, password} = req.body
            const user = await User.findOne({
                where: {email}
            })
            if(!user){
                throw {
                    name : "LoginFailed"
                }
            }
            const validPassword = compare(password, user.password)
            if(!validPassword){
                throw {
                    name : "LoginFailed"
                }
            }
            const payload = {
                id : user.id
            }
            const access_token = generateToken(payload)
            res.status(200).json({ access_token, username:user.username })
            
        } catch (error) {
            next(error)
        }
    }
}
module.exports = userController