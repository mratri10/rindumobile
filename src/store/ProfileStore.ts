import { makeAutoObservable, runInAction } from "mobx";
import { UseLocal } from "../util/localStorage";
import fetchAPI from "../api/fetch";

type TokenDataType = {
    id: number,
    username: string,
    role?: number,
    token: string
}
export type UserDataType = {
    id: number,
    name: string,
    birthday: string,
    gender: number,
    marriage?: number,
    religion?: number,
    education?: number,
    numberId?: number[]
}
export const initResponProfile: UserDataType = {
    id: 0,
    name: '',
    birthday: '',
    gender: 0
}
class ProfileStore {
    constructor() {
        makeAutoObservable(this)
    }
    tokenData: TokenDataType = {
        id: 0,
        username: '',
        token: '',
    }
    // userData:
    respon = initResponProfile
    respon_error = null

    saveUserData = async () => {
        await UseLocal('token').then(v => {
            const respon = JSON.parse(v!)
            runInAction(() => {
                this.tokenData = respon.respon
            })
            this.getAllUserData()
        }).catch(error => {
            alert("Terjadi sesuatu pada data")
            console.log("<<<<<<<<<<<<< ERROR saveUserData >>>>>>>>>>>>>>", error)
        });
    }

    getAllUserData = async () => {
        fetchAPI('biodata', this.tokenData.token, 'GET').then(data => {
            if (data.status != 200) {
                runInAction(() => {
                    this.respon_error = data
                })
            } else {
                runInAction(() => {
                    this.respon = data.respon
                })
            }
        }).catch(error => {
            runInAction(() => {
                this.respon_error = error
            })
        })
    }

    get showUserData() {
        return this.tokenData
    }
}

const profileStore = new ProfileStore()
export default profileStore