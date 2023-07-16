import { makeAutoObservable } from 'mobx'


export type ValidationType = 'required' | 'maxlenght_10' | 'minlength_6' | 'email'

type handleType = {
    message: string
    value: boolean
    name: string
}

class TextInputStore {
    constructor() {
        makeAutoObservable(this)
    }
    value: any = {
        error_all: []
    };
    checkError: boolean = false;
    numError: number = 0

    onText(text: string, name: string) {
        this.value = { ...this.value, [name]: text }
    }

    onValidation(name: string, validation?: ValidationType[], label?: string) {
        if (validation) {
            validation.map(v => {
                if (v == 'required') {
                    this.handleValidation({
                        value: this.value[name] == null || this.value[name] == "",
                        name: name,
                        message: (label ?? name) + " harus dimasukkan"
                    })
                } else {
                    if (this.value[name] == null || this.value[name] == "") {
                        this.value = { ...this.value, [name + '_error']: [] }
                    }
                }
                if (this.value[name]) {
                    if (v == 'minlength_6') {
                        this.handleValidation({
                            value: this.value[name].length < 10,
                            name: name,
                            message: "Minimal Masukan 6 Karakter"
                        })
                    }
                    if (v == 'maxlenght_10') {
                        this.handleValidation({
                            value: this.value[name].length > 10,
                            name: name,
                            message: "Maksimal Masukan 10 Karakter"
                        })
                    }
                    if (v == 'email') {
                        const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        this.handleValidation({
                            value: !emailRegex.test(this.value[name]),
                            name: name,
                            message: "Masukan harus format email"
                        })
                    }
                }
            })
        }
    }

    handleValidation({ message, value, name }: handleType) {
        let mess: string[] = this.value[name + '_error'] || []

        if (value) {
            if (mess.filter(v => v == message).length == 0) {
                mess.push(message)
                this.value = { ...this.value, [name + '_error']: mess }

                this.handleAddError(message, name)
            }


        } else {
            if (mess.filter(v => v == message).length > 0) {
                const index = mess.indexOf(message);
                mess.splice(index, 1)
                this.value = { ...this.value, [name + '_error']: mess }

                this.handleRemoveError(message, name)
            }
        }
    }

    handleAddError(message: string, name: string) {
        const messAllData: string[] = this.value['error_all'] ?? []
        const messageFormat = name + "_" + message
        messAllData.push(messageFormat)
        this.value = { ...this.value, error_all: messAllData }
    }

    handleRemoveError(message: string, name: string) {
        const messAllData: string[] = this.value['error_all'] ?? []
        const messageFormat = name + "_" + message
        const indexAll = messAllData.indexOf(messageFormat);
        messAllData.splice(indexAll, 1)
        this.value = { ...this.value, error_all: messAllData }
    }


    onCheckError() {
        this.checkError = !this.checkError
    }

    onReset() {
        this.value = { error_all: [] }
        this.checkError = false;
        this.numError = 0
    }


    get isError() {
        const nummError = this.value.error_all.length
        return nummError > 0
    }
}

const textInputStore = new TextInputStore()
export default textInputStore