const {ComponentInfo} = require('../models/models') // 
const ApiError = require('../error/ApiError') //

class InfoController{
    async create(req, res){
        let {title, description, componentId} = req.body //
        const component_info = await ComponentInfo.create({title, description, componentId})
        return res.json(component_info)
    } 

    async getAll(req, res){
        const component_infos = await ComponentInfo.findAll()
        return res.json(component_infos)
    }

    async getComponentAll(req, res, next){
    try {
        const {componentId} = req.params
        const component_infos = await ComponentInfo.findAll({where:{componentId},})
        return res.json(component_infos)
    } catch(e) {
        next(ApiError.badRequest(e.message))
    }
    }
    
    async deleteOne(req, res, next){
        try {
            const {id} = req.params
            const component_info = await ComponentInfo.destroy(
                {
                    where:{id},
                }
            )
            return res.json(component_info)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async updateOne(req, res, next){
        try {
            const {id, description} = req.params
            const component_info = await ComponentInfo.update({
                description},
                {
                    where:{id},
                }
            )
            return res.json(component_info)
        } catch(e) {
            next(ApiError.badRequest(e.message))
        }
    }
}


module.exports = new InfoController()