const {Brand} = require('../models/models') // 
const ApiError = require('../error/ApiError') //

class BrandController{
    async create(req, res){
        const {name} = req.body //
        const brand = await Brand.create({name})
        return res.json(brand)
    }
    async getAll(req, res){
        const brands = await Brand.findAll()
        return res.json(brands)
    }
    
    async deleteOne(req, res, next){
        try {
            const {id} = req.params
            const brand = await Brand.destroy(
                {
                    where:{id},
                }
            )
            return res.json(brand)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async updateOne(req, res, next){
        try {
            const {id,name} = req.params
            const brand = await Brand.update({
                name},
                {
                    where:{id},
                }
            )
            return res.json(brand)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }
}


module.exports = new BrandController()