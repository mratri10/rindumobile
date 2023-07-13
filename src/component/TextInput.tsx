import React, { useEffect, useState } from 'react';
import { Image, KeyboardTypeOptions, StyleProp, Text, TextInput, TextStyle, View, ViewStyle } from 'react-native';
import { observer } from 'mobx-react-lite'
import { useStore } from '../store';
import { ValidationType } from '../store/TextInputStore';
import { eye, eyeHide } from '../util/picture';
import { TouchableOpacity } from 'react-native-gesture-handler';

type TextInputType = {
    model?: KeyboardTypeOptions
    name: string,
    placeholder?: string,
    validation?: ValidationType[]
    styleInput?: StyleProp<ViewStyle>,
    styleTitle?: StyleProp<TextStyle>,
    label?: string,
    placeholderTextColor?: string,
    isPassword?: boolean
}
function TextInputApp({ model,
    name,
    placeholder,
    validation,
    styleInput,
    styleTitle,
    label,
    placeholderTextColor,
    isPassword }: TextInputType) {
    const textInputStore = useStore("textInputStore")
    const errorText: string[] = textInputStore.value[name + '_error'] ?? []

    const [showSecure, isShowSecure] = useState(true)
    useEffect(() => {
        textInputStore.onValidation(name, validation, label)
    }, [])
    return (
        <View style={{ width: '100%' }}>
            {label ? <Text style={[{ marginBottom: 5 }, styleTitle]}>{label}</Text> : null}
            <View style={[{ paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center' }, styleInput]}>
                <TextInput
                    placeholder={placeholder}
                    value={textInputStore.value[name]}
                    keyboardType={model}
                    onChangeText={(text) => {
                        textInputStore.onText(text, name)
                        textInputStore.onValidation(name, validation, label)
                    }}
                    secureTextEntry={isPassword && showSecure}
                    placeholderTextColor={placeholderTextColor}
                    style={{ color: placeholderTextColor, flex: 1 }} />
                {isPassword ? <View>
                    <TouchableOpacity onPress={() => isShowSecure(!showSecure)}>
                        <Image source={showSecure ? eyeHide : eye} style={{ height: 20, width: 20, tintColor: 'white' }} />
                    </TouchableOpacity>
                </View> : null}
            </View>
            {textInputStore.checkError ? <Text style={{ fontSize: 12, color: 'red', textAlign: 'center' }}>{errorText[0]}</Text> : <View style={{ height: 16.5 }} />}
        </View>
    )
}

export default observer(TextInputApp)