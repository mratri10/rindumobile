import {NavigationContainer} from '@react-navigation/native';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import * as React from 'react';
import HomeScreen from './scene/HomeScreen';
import AScene from './scene/AScene';
import {ColorApp} from './util/color';
import {BackHandler, StyleSheet, Text, View} from 'react-native';
import AuthScreen from './scene/AuthScreen';
import SplashScreen from './scene/SplashScreen';
import PasswordScreen from './scene/PasswordScreen';
import {useStore} from './store';

export type RootStackParamList = {
  SplashScreen: undefined;
  AuthScreen: undefined;
  PasswordScreen: undefined;
  HomeScreen: undefined;
  AScene: undefined;
};
export type PropScreen = {
  navigation: StackNavigationProp<RootStackParamList>;
};
function RouteApp() {
  const Stack = createStackNavigator<RootStackParamList>();

  const baseOptions: any = {
    headerStyle: styles.backgroundStyle,
    headerMode: 'float',
    headerTitleAlign: 'center',
    headerTitleStyle: styles.titleHeader,
  };
  const notHeader: any = {headerShown: false};
  const splashOnly: any = {headerShown: false, headerMode: 'float'};
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SplashScreen">
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={splashOnly}
          />
          <Stack.Screen
            name="AuthScreen"
            component={AuthScreen}
            options={notHeader}
          />
          <Stack.Screen
            name="PasswordScreen"
            component={PasswordScreen}
            options={notHeader}
          />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={notHeader}
          />
          <Stack.Screen
            name="AScene"
            component={AScene}
            options={baseOptions}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: ColorApp.primary,
  },
  titleHeader: {
    color: ColorApp.light,
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default RouteApp;
