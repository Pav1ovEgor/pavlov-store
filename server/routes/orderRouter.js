const Router = require('express');
const router = new Router();
const orderController = require('../controllers/orderController'); // Импорт контроллера

router.post('/', orderController.create)
router.get('/:userId', orderController.getAll)
router.get('/:userId/:status', orderController.getAllByStatus)
router.post('/:id/:status', orderController.updateOne)

module.exports = router