const {User} = require("../models")

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
}
module.exports = userController