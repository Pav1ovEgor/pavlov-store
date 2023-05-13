const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt') // Хеш паролей.
const jwt = require('jsonwebtoken') // Импорт генератор токена.
const { User, Basket } = require('../models/models')


const generateJwt = (id, email, role) => {
    return jwt.sign(
        { id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }   // Время жизни токена.
    )
}


class UserController {

    async registration(req, res, next) {
        const { email, password, role } = req.body

        if (!email || !password) {
            return next(ApiError.badRequest('Некорректный Email или Password.'))
        }
        const candidate = await User.findOne({ where: { email } }) // Проверка на повторение.
        if (candidate) {
            return next(ApiError.badRequest('Пользователь с таким Email уже существует.'))
        }

        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({ email, role, password: hashPassword })
        //const basket = await Basket.create({ userId: user.id })

        const token = generateJwt(user.id, user.email, user.role)

        return res.json({ token })
    }

    async login(req, res, next) {
        const { email, password } = req.body
        const user = await User.findOne({ where: { email } })
        if (!user) {
            return next(ApiError.badRequest('Пользователь не найден.'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password) // Сравниваем пароли.
        if (!comparePassword) {
            return next(ApiError.badRequest('Пароль указан не верно.'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({ token })
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({ token })
    }

    async getRole(req, res, next) { 
        try {
        const token = req.headers.authorization.split(' ')[1]  // tak kak "Int dwdwdwdw", posle probela nahodim token, 
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        return res.json(decoded.role)
        }catch(e){
            res.status(401).json({ message: "Пользователь не авторизован" })
        }
    }

    async getEmail(req, res, next) { 
        try {
        const token = req.headers.authorization.split(' ')[1]  // tak kak "Int dwdwdwdw", posle probela nahodim token, 
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        return res.json(decoded.email)
        }catch(e){
            res.status(401).json({ message: "Пользователь не авторизован" })
        }
    }

    async getId(req, res, next) { 
        try {
        const token = req.headers.authorization.split(' ')[1]  // tak kak "Int dwdwdwdw", posle probela nahodim token, 
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        return res.json(decoded.id)
        }catch(e){
            res.status(401).json({ message: "Пользователь не авторизован" })
        }
    }
}

module.exports = new UserController()   