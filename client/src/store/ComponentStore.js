import {makeAutoObservable} from "mobx"

export default class ComponentStore {
    constructor(){
        this._types = []        
        this._brands = []
        this._components = []
        this._infos = []
        this._orders = []
        this._baskets = []
        this._selectedComponent = {}
        this._selectedType = {} 
        this._selectedBrand = {} 
        this._selectedOrder = {}
        this._selectedName = {}
        this._selectedButton = 0;
        this._page = 1
        this._totalCount = 0
        this._limit = 8
        makeAutoObservable(this) 
    }

    setTypes(types){ //action, изменяет состояние
        this._types = types
    }
    setBrands(brands){
        this._brands = brands
    }
    setComponents(components){
        this._components = components
    }
    setInfos(infos){
        this._infos = infos
    }
    setOrders(orders){
        this._orders = orders
    }
    setBaskets(baskets){
        this._baskets = baskets
    }

    setSelectedComponent(component){ //нажатий тип
        this.setPage(1)
        this._selectedComponent = component
    }
    setSelectedType(type){ //нажатий тип
        this.setPage(1)
        this._selectedType = type
    }
    setSelectedBrand(brand){ //нажатий бренд
        this.setPage(1)
        this._selectedBrand = brand
    }
    setSelectedName(name){ //NAME
        this.setPage(1)
        this._selectedName = name
    }
    setSelectedButton(button){ //NAME
        this.setPage(1)
        this._selectedButton = button
    }
    setSelectedOrder(order){ //NAME
        this._selectedOrder = order
    }
    setPage(page) {
        this._page = page
    }
    setTotalCount(count) {
        this._totalCount = count
    }

    get types(){  // Компьютед функции.
        return this._types
    }
    get brands(){
        return this._brands
    }
    get components(){
        return this._components
    }
    get infos(){
        return this._infos
    }
    get orders(){
        return this._orders
    }
    get baskets(){
        return this._baskets
    }

    get selectedComponent(){
        return this._selectedComponent
    }
    get selectedType(){
        return this._selectedType
    }
    get selectedBrand(){
        return this._selectedBrand
    }
    get selectedName(){
        return this._selectedName
    }
    get selectedButton(){
        return this._selectedButton
    }
    get selectedOrder(){
        return this._selectedOrder
    }
    get totalCount() {
        return this._totalCount
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }

}