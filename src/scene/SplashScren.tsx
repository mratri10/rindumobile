import * as React from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import { minangImage } from '../util/picture';
import { ColorApp } from '../util/color';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Route';

const FULL_WIDTH = Dimensions.get('screen').width
type HomeProp = {
    navigation: StackNavigationProp<RootStackParamList, 'HomeScreen'>
}
function SplashScreen({ navigation }: HomeProp) {
    React.useEffect(() => {
        setTimeout(() => {
            navigation.replace('AuthScene')
        }, 3000)
    }, [])
    return (
        <View style={styles.main}>
            <Image source={minangImage} style={{ width: FULL_WIDTH - 80, height: FULL_WIDTH - 80 }} />
            <Text style={styles.title}>Rindu App</Text>
            <Text style={styles.describe}>Dima Bumi Dipijak Disitu Langik Dijinjing</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: ColorApp.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: ColorApp.light,
        fontSize: 28,
        fontWeight: 'bold'
    },
    describe: {
        color: ColorApp.light,
        fontSize: 14
    }
})

export default SplashScreen