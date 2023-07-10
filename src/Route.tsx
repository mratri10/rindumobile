import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import HomeScreen from './scene/HomeScene';
import AScene from './scene/AScene';
import { ColorApp } from './util/color';
import { StyleSheet, Text, View } from 'react-native';

export type RootStackParamList = {
    Home: undefined;
    Detail: undefined;
};
function RouteApp() {
    const Stack = createStackNavigator<RootStackParamList>();

    const baseOptions: any = {
        headerStyle: styles.backgroundStyle,
        headerMode: 'float',
        headerTitleAlign: 'center',
        headerTitleStyle: styles.titleHeader
    }
    const notHeader: any = { headerShown: false }
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen name="Home" component={HomeScreen} options={notHeader} />
                <Stack.Screen name="Detail" component={AScene} options={baseOptions} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    backgroundStyle: {
        backgroundColor: ColorApp.primary,
    },
    titleHeader: {
        color: ColorApp.light,
        fontWeight: 'bold',
        fontSize: 20
    }
})

export default RouteApp