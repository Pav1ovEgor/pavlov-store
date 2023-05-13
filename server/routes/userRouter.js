const Router = require('express')
const router = new Router();
const userController = require('../controllers/userController') // Импорт контроллера
const authMiddleware = require('../middleware/authMiddleware') // Проверка авторизации

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.get('/getRole', userController.getRole)
router.get('/getEmail', userController.getEmail)
router.get('/getId', userController.getId)


module.exports = router