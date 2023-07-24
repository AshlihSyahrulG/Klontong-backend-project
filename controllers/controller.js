const { Product } = require ('../models/index')

class Controller{
    static async findAllProduct ( req, res, next) {
        try {
            const data = await Product.findAll()
            res.status(200).json(data)
        } catch (error) {
            next()
        }
    }
    

}

module.exports = Controller