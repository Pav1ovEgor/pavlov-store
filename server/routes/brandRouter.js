const Router = require('express')
const router = new Router();
const brandController = require('../controllers/brandController')

router.post('/', brandController.create) //создание
router.get('/', brandController.getAll) //получение
router.post('/:id', brandController.deleteOne)
router.post('/:id/:name', brandController.updateOne)

module.exports = router