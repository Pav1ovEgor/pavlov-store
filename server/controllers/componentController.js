const uuid = require('uuid') //создание случ ключа не повт
const path = require('path') //путь
const { Op } = require("sequelize"); ///
const { Component, ComponentInfo } = require('../models/models')
const ApiError = require('../error/ApiError')

class ComponentController {
    async create(req, res, next) {
        try {
            let { name, price, brandId, typeId, info, amount} = req.body // получение
            const { img } = req.files // пакет epress-fileuploud
            let fileName = uuid.v4() + ".jpg" // uuid реген айдишника
            img.mv(path.resolve(__dirname, '..', 'static', fileName)) // Перемещение файла в папку

            const component = await Component.create({ name, price, brandId, typeId, img: fileName, amount})

            if (info) {
                info = JSON.parse(info)
                info.forEach(i => {
                    ComponentInfo.create({
                        title: i.title,
                        description: i.description,
                        componentId: component.id
                    })

                });
            }

            return res.json(component)
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getAll(req, res) {
        let { brandId, typeId, limit, page, name } = req.query
        page = page || 1 // Если не указана, то 1
        limit = limit || 8 // Количество на странице
        let offset = page * limit - limit // Первый тавар на странице
        let components
        if (!brandId && !typeId && !name) {
            components = await Component.findAndCountAll({ limit, offset })
        }
        if (brandId && !typeId && !name) {
            components = await Component.findAndCountAll({ where: { brandId }, limit, offset })
        }
        if (!brandId && typeId && !name) {
            components = await Component.findAndCountAll({ where: { typeId }, limit, offset })
        }
        if (brandId && typeId && !name) {
            components = await Component.findAndCountAll({ where: { typeId, brandId }, limit, offset })
        }


        if (!brandId && !typeId && name) {
            components = await Component.findAndCountAll({ where: { name: { [Op.iLike]: `%${name}%` } }, limit, offset })
        }
        if (brandId && !typeId && name) {
            components = await Component.findAndCountAll({ where: { brandId, name: { [Op.iLike]: `%${name}%` } }, limit, offset })
        }
        if (!brandId && typeId && name) {
            components = await Component.findAndCountAll({ where: { typeId, name: { [Op.iLike]: `%${name}%` } }, limit, offset })
        }
        if (brandId && typeId && name) {
            components = await Component.findAndCountAll({ where: { typeId, brandId, name: { [Op.iLike]: `%${name}%` } }, limit, offset })
        }
        return res.json(components)
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const component = await Component.findOne(
                {
                    where: { id },
                    include: [{ model: ComponentInfo, as: 'info' }] // 
                }
            )
            return res.json(component)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async deleteOne(req, res, next) {
        try {
            const { id } = req.params
            const component = await Component.destroy({ where: { id } })
            return res.json(component)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async updateOne(req, res, next) {
        try {
            let { id, name, price, brandId, typeId, amount} = req.body // получение
            const { img } = req.files // пакет epress-fileuploud
            let fileName = uuid.v4() + ".jpg" // uuid реген айдишника
            img.mv(path.resolve(__dirname, '..', 'static', fileName)) // Перемещение файла в папку

            const component = await Component.update({ name, price, brandId, typeId, img: fileName, amount}, { where: { id } })

            return res.json(component)
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async updateComponentAmount(req, res, next) {
        try {
            let { id, newAmount } = req.body // получение

            const component = await Component.update({ amount : newAmount}, { where: { id } })

            return res.json(component)
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

}

module.exports = new ComponentController()