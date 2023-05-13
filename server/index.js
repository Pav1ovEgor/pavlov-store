require('dotenv').config() // Подключение дотенм конфига
const express = require('express') // Импорт модуля экспресса.
const sequelize = require('./db') // Импортируем объект который мы сделали в файле дб.
const models = require('./models/models')
const cors = require('cors') // Импорт корс.
const fileUpload = require('express-fileupload') // Импорт корс.
const router = require('./routes/index') // Основной роутер(связывающий остальные)
const errorHandler = require('./middleware/ErrorHandlingMiddleware') // Ипорт миддлвэйр. 
const path = require('path')
const cookieParser = require('cookie-parser')

const PORT = process.env.POST || 5432 // создание порта

const app = express()  // Объект экспресса.
app.use(cors()) // Передаём корс в функцию юз.
app.use(express.json()) // Парсить json фармат.
app.use(express.static(path.resolve(__dirname, 'static'))) // Явное указание серверу, что файлы из статик как статику.
app.use(fileUpload({})) // Регистрирование файл.
app.use('/api', router)
// Обработка ошибок, последний Middleware. Замыкающий.
app.use(errorHandler)
app.use(cookieParser(process.env.SECRET_KEY))

const start = async () => { // Функция старт, асинхронная.
    try{
        await sequelize.authenticate() // Устанавливается подключение к бд.
        await sequelize.sync({ alter: true }) // Свиряем состояние бд с схемой данных. await sequelize.sync({ alter: true }) для обновления
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))       // zapusc
    }
    catch(e){

    }
} 


start()

