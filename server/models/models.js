const sequelize = require('../db.js') //импорт объекта sequalize
const { DataTypes } = require('sequelize') // из пакета sequalize импорт класс DataTypes(типы)

const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
})

const Order = sequelize.define('order', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    address: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.STRING, allowNull: false },
    finalPrice: { type: DataTypes.STRING, allowNull: true },
})

const Basket = sequelize.define('basket', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    amount: { type: DataTypes.INTEGER, allowNull: false },
})

const Component = sequelize.define('component', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    img: { type: DataTypes.STRING, allowNull: false },
    amount: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
})

const Type = sequelize.define('type', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true },
})

const Brand = sequelize.define('brand', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true },
})

const ComponentInfo = sequelize.define('component_info', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
})


User.hasMany(Order) // Связь 1 к м
Order.belongsTo(User) // Карзина пренадлежит пользователю.

Order.hasMany(Basket)
Basket.belongsTo(Order)

Component.hasMany(Basket)
Basket.belongsTo(Component)

Type.hasMany(Component)
Component.belongsTo(Type)

Brand.hasMany(Component)
Component.belongsTo(Brand)

Component.hasMany(ComponentInfo, { as: 'info' }) // Инфо- поле массива характеристик. 
ComponentInfo.belongsTo(Component)

module.exports = {
    User,
    Basket,
    Component,
    Type,
    Brand,
    Order,
    ComponentInfo,
}