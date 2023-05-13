const Router = require('express')
const router = new Router()
const componentRouter = require('./componentRouter')
const userRouter = require('./userRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')
const infoRouter = require('./infoRouter')
const basketRouter = require('./basketRouter')
const orderRouter = require('./orderRouter')


router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/component', componentRouter)
router.use('/info', infoRouter)
router.use('/basket', basketRouter)
router.use('/order', orderRouter)


module.exports = router