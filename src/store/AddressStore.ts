import { makeAutoObservable, runInAction } from "mobx";
import fetchAPI from "../api/fetch";

class AddressStore {
    constructor() {
        makeAutoObservable(this)
    }
    dataProvince = []

    getDataProvince = async () => {
        await fetchAPI('region', '', 'GET')?.then(value => {
            runInAction(() => {
                this.dataProvince = value ?? []
            })
        })
    }

}

const addressStore = new AddressStore()
export default addressStore