import {NavigationContainer} from '@react-navigation/native';
import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import * as React from 'react';
import AScene from './scene/AScene';
import {ColorApp} from './util/color';
import {StyleSheet} from 'react-native';
import AuthScreen from './scene/AuthScreen';
import SplashScreen from './scene/SplashScreen';
import SignUpScreen from './scene/SignUpScreen';
import SignInScreen from './scene/SignInScreen';
import MainScreen from './scene/MainScreen/MainScreen';
import EditUserScreen from './scene/EditUserScreen';

export type BottomKey = 'home' | 'transaction' | 'profile';
export type RootStackParamList = {
  SplashScreen: undefined;
  AuthScreen: undefined;
  SignUpScreen: undefined;
  SignInScreen: undefined;
  MainScreen: {
    selected: BottomKey;
  };
  AScene: undefined;
  EditUserScreen: undefined;
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
    headerTintColor: ColorApp.dark,
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
            name="SignUpScreen"
            component={SignUpScreen}
            options={notHeader}
          />
          <Stack.Screen
            name="SignInScreen"
            component={SignInScreen}
            options={notHeader}
          />
          <Stack.Screen
            name="MainScreen"
            component={MainScreen}
            initialParams={{selected: 'home'}}
            options={notHeader}
          />
          <Stack.Screen
            name="EditUserScreen"
            component={EditUserScreen}
            options={notHeader}
          />
          <Stack.Screen
            name="AScene"
            component={AScene}
            options={{
              title: '',
            }}
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
    color: ColorApp.dark,
    fontSize: 20,
  },
});

export default RouteApp;
