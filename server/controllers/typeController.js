const {Type} = require('../models/models') // 
const ApiError = require('../error/ApiError') //

class TypeController{
    async create(req, res){
        const {name} = req.body //извлекаме название типа
        const type = await Type.create({name})
        return res.json(type)
    }

    async getAll(req, res){
        const types = await Type.findAll()
        return res.json(types)
    }

    async deleteOne(req, res, next){
        try {
            const {id} = req.params
            const type = await Type.destroy(
                {
                    where:{id},
                }
            )
            return res.json(type)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async updateOne(req, res, next){
        try {
            const {id,name} = req.params
            const type = await Type.update({
                name},
                {
                    where:{id},
                }
            )
            return res.json(type)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new TypeController()