import {makeAutoObservable} from "mobx"

export default class UserStore {
    constructor(){
        this._isAuth = false // "_ff" нельзя изменять
        this._user = {}
        makeAutoObservable(this)
    }

    setIsAuth(bool){ //action, изменяет состояние
        this._isAuth = bool
    }
    setUser(user){    
        this._user = user
    }

    get isAuth(){  // Компьютед функции.
        return this._isAuth
    }
    get user(){
        return this._user
    }
}