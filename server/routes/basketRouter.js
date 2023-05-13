const Router = require('express')
const router = new Router();
const basketController = require('../controllers/basketContoller')

router.post('/', basketController.create) //создание
router.get('/:orderId', basketController.getAll) //получение

module.exports = router