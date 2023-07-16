import { makeAutoObservable, reaction, runInAction } from "mobx";
import fetchAPI from "../api/fetch";

class AuthStore {
    constructor() {
        makeAutoObservable(this)
    }

    respon = null;
    respon_error = {
        message: null
    };

    postSignUp(params: any) {
        fetchAPI('signup', '', 'POST', params).then(data => {
            if (data.status != 200) {
                runInAction(() => {
                    this.respon_error = data
                })
            } else {
                runInAction(() => {
                    this.respon = data
                })
            }

        }).catch(error => {
            runInAction(() => {
                this.respon_error = error
            })

        })
    }
}

const authStore = new AuthStore()
export default authStore