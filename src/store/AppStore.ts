import { makeAutoObservable } from 'mobx'

class AppStore {
    constructor() {
        makeAutoObservable(this)
    }
    inputFocus: string = '';
    username: string = '';


    setFocus(value: string) {
        this.inputFocus = value
    }

    setUsername(value: string) {
        this.username = value
    }
}

const appStore = new AppStore
export default appStore