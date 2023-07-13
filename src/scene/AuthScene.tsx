import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ColorApp } from '../util/color';
import TextInputApp from '../component/TextInput';
import { useStore } from '../store';
import textInputStore from '../store/TextInputStore';
import { observer } from 'mobx-react-lite'

function AuthScene() {
    const inputStore = useStore("textInputStore")

    const submitAuth = () => {
        textInputStore.onCheckError()
    }
    return (
        <View style={styles.main}>
            <View />
            <View style={styles.content}>
                <Text style={styles.titleText}>Log In</Text>
                <Text style={styles.describeText}>Ayo Tingkatkan SDM Urang Awak</Text>
                <View style={{ height: 20 }} />
                <TextInputApp name='username' placeholder='Masukan Username Anda' label='Username'
                    styleInput={styles.textInput} styleTitle={styles.titleInput}
                    placeholderTextColor='white'
                    validation={['required']} />
                <View style={{ height: 5 }} />
                <TextInputApp name='password' placeholder='Masukan Password Anda' label='Password'
                    styleInput={styles.textInput} styleTitle={styles.titleInput}
                    placeholderTextColor='white' isPassword={true}
                    validation={['required']} />
                <View style={{ height: 15 }} />
                <TouchableOpacity style={styles.btn} onPress={submitAuth} disabled={inputStore.isError}>
                    <Text style={styles.titleBtn}> Login </Text>
                </TouchableOpacity>
            </View>
            <View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: ColorApp.primary,
        justifyContent: 'space-between'
    },
    content: {
        padding: 20,
        alignItems: 'center'
    },
    titleText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold'
    },
    describeText: {
        color: 'white',
        fontSize: 12
    },
    titleInput: {
        color: 'white',
        fontWeight: 'bold'
    },
    textInput: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 10
    },
    btn: {
        backgroundColor: ColorApp.light,
        paddingVertical: 10,
        paddingHorizontal: 30,
        borderRadius: 10
    },
    titleBtn: {
        color: ColorApp.primary,
        fontSize: 16,
        fontWeight: 'bold'
    }
})

export default observer(AuthScene)