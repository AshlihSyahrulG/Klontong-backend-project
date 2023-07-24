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
    
    static async addProduct ( req , res , next) {
        try {
            const { CategoryId , categoryName, sku, name,description, weight, width, length, height, image, harga} = req.body
            const data = await Product.create({
                CategoryId , categoryName, sku, name,description, weight,width, length, height, image, harga
            })
            res.status(201).json(data)
        } catch (error) {
            next()
        }
    }
}

module.exports = Controller