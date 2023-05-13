const { Component, Order, Basket, User } = require('../models/models')
const ApiError = require('../error/ApiError')
const { Sequelize } = require('../db')


class OrderController {

    async create(req, res, next){
        try{
            let {address, status, userId, finalPrice, baskets} = req.body //

            let checkAmount = baskets // Проверка на наличие.
            if (checkAmount) {
                checkAmount = JSON.parse(checkAmount)
                for (const i of checkAmount) {
                    if (i.checkAmount < 1) {
                        return next(ApiError.badRequest(`Ошибка в корзине, нельзя купить меньше 1. Вы купили ${i.checkAmount} штук.`))
                    }
                    const component = await Component.findOne({ where: { id: i.id } })
                    if ((component.amount - i.amountInBasket) < 0 ){
                        return next(ApiError.badRequest(`Количество компонентов на складе изменилось. ${component.name} осталось в количестве ${component.amount} штук.`))
                    }
                }
            }

            // Если проверка на наличие прошло.
            const order = await Order.create({address, status, userId, finalPrice})
            if (baskets) {
                baskets = JSON.parse(baskets)
                baskets.forEach(i => {
                    Basket.create({
                        orderId: order.id,
                        componentId: i.id,
                        amount: i.amountInBasket
                    });
                    Component.update({amount: Sequelize.literal(`amount - ${i.amountInBasket}`)}, { where: { id: i.id } })
                });
            }
            return res.json(order)      

        }catch(e){
            next(ApiError.badRequest(e.message))
        }
    } 
    

    async getAll(req, res, next) {
        try{
        const {userId} = req.params
        const order = await Order.findAll({where:{userId},})
        return res.json(order)
        }catch(e){
            next(ApiError.badRequest(e.message))
        }   
    }

    async getAllByStatus(req, res, next) {
        try{
        let {status} = req.params
        const order = await Order.findAll({
                where:{status},
                include:{ model: User}
            })
        return res.json(order)
        }catch(e){
            next(ApiError.badRequest(e.message))
        }   
    }

    async updateOne(req, res, next){
        try {
            const {id, status} = req.params
            const order = await Order.update({
                status},
                {
                    where:{id},
                }
            )
            return res.json(order)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new OrderController()