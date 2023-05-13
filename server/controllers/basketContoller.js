const { Component, Basket } = require('../models/models')
const ApiError = require('../error/ApiError')

class BasketController {

    async create(req, res, next){
        try{
        let {userId, componentId, amount} = req.body //
        const basket = await Basket.create({userId, componentId, amount})
        return res.json(basket)
        }   catch(e){
        next(ApiError.badRequest(e.message))
        }
    } 
    

    async getAll(req, res, next) {
        try{
        const {orderId} = req.params
        const basket = await Basket.findAll({
            where:{orderId},
            include:{ model: Component}
        })
        return res.json(basket)
        }catch(e){
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new BasketController()