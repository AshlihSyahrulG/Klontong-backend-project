const { Product } = require ('../models/index')
const { Op } = require("sequelize");
const { getPagination , getPagingData } = require('../helpers/pagination')

class Controller{
    static async findAllProduct ( req, res, next) {
        try {
            const { page, size, name } = req.query;
            const condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;
            const { limit, offset } = getPagination(page, size);
            const product = await Product.findAndCountAll({ where: condition, limit, offset })
            const response = getPagingData(product, page, limit);
            // const data = await Product.findAll()
            res.status(200).json(response)
        } catch (error) {
            next(error)
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
            next(error)
        }
    }

    static async findDetailProduct(req,res,next){
        const { id } = req.params
        try {
            const productDetail = await Product.findByPk(id)
            if (!productDetail) {
                throw { name : "ProductNotFound"}
            }
            res.status(200).json(productDetail)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller