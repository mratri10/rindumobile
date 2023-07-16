import AsyncStorage from "@react-native-async-storage/async-storage"

type KeyType = 'token' | 'user'
export const SaveLocal = async (key: KeyType, value: any) => {
    await AsyncStorage.setItem(key, JSON.stringify(value))
}

export const UseLocal = async (key: KeyType) => {
    return await AsyncStorage.getItem(key).then(value => {
        console.log("<<<<<<<<<<<< LOCAL STORAGE >>>>>>>>>>>>>>>>>>", value)
        return value
    }).catch(error => {
        console.log("<<<<<<<<<<<< ERROR LOCAL STORAGE >>>>>>>>>>>>>>>>>>", error)
    })
}

export const CLearLocal = async () => {
    return await AsyncStorage.clear()
}