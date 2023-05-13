const Router = require('express')
const router = new Router();
const componentController = require('../controllers/componentController')
const checkRole = require('../middleware/checkRoleMiddleware') // Проверка роли

router.post('/', checkRole('ADMIN'), componentController.create)
router.get('/', componentController.getAll)
router.get('/:id', componentController.getOne) 
router.post('/:id', componentController.deleteOne)
router.post('/:id/:name', componentController.updateOne)
router.post('/updateComponentAmount/:component/:component', componentController.updateComponentAmount)

module.exports = router