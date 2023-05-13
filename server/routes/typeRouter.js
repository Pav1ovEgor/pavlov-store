const Router = require('express');
const router = new Router();
const typeController = require('../controllers/typeController'); // Импорт контроллера
const checkRole = require('../middleware/checkRoleMiddleware') // Проверка роли

router.post('/', checkRole('ADMIN'), typeController.create)
router.get('/', typeController.getAll)

router.post('/:id', typeController.deleteOne)
router.post('/:id/:name', typeController.updateOne)

module.exports = router