const Router = require('express');
const router = new Router();
const infoController = require('../controllers/infoController'); // Импорт контроллера
const checkRole = require('../middleware/checkRoleMiddleware') // Проверка роли

router.post('/', checkRole('ADMIN'), infoController.create)
router.get('/', infoController.getAll)
router.get('/:componentId', infoController.getComponentAll)

router.post('/:id', infoController.deleteOne)
router.post('/:id/:description', infoController.updateOne)

module.exports = router