import { makeAutoObservable } from 'mobx'


class CounterStore {
    constructor() {
        makeAutoObservable(this)
    }
    value: number = 0;

    increaseTimer() {
        this.value += 1
    }

    decreaseTimer() {
        this.value -= 1
    }

    get getData() {
        const ten = this.value == 10
        const nine = this.value == 9

        return ten
    }
}

const counterStore = new CounterStore()
export default counterStore