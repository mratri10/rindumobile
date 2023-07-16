import AsyncStorage from "@react-native-async-storage/async-storage"

export const SaveLocal = async (key: string, value: any) => {
    await AsyncStorage.setItem(key, JSON.stringify(value))
}

export const UseLocal = async (key: string) => {
    return await AsyncStorage.getItem(key).then(value => {
        return JSON.parse(JSON.stringify(value))
    }).catch(error => {
        console.log("<<<<<<<<<<<< ERROR LOCAL STORAGE >>>>>>>>>>>>>>>>>>", error)
    })
}

export const CLearLocal = async () => {
    return await AsyncStorage.clear()
}