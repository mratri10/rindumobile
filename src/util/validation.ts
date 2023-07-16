
export const MIN3 = {
    required: 'This field is required',
    minLength: { value: 3, message: 'Minimum length is 3' },
}

export const REQUIRED = {
    required: 'This field is required',
}

export const PASSWORD_CONFIRM = {
    required: 'This field is required',
}

export const NOSPASI = {
    required: "Required",
    pattern: {
        value: /^\S+$/,
        message: "Username tidak boleh menggunakan spasi"
    }
}