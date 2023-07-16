import React, {useEffect} from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {minangImage} from '../util/picture';
import {ColorApp} from '../util/color';
import {PropScreen} from '../Route';
import {observer} from 'mobx-react-lite';
import {useStore} from '../store';
import {UseLocal} from '../util/localStorage';

const FULL_WIDTH = Dimensions.get('screen').width;

function SplashScreen({navigation}: PropScreen) {
  const addressStore = useStore('addressStore');
  useEffect(() => {
    addressStore.getDataProvince();
  }, []);
  useEffect(() => {
    setTimeout(() => {
      if (addressStore.dataProvince.length > 0) {
        dataLocal();
      }
    }, 3000);
  }, [addressStore.dataProvince]);

  const dataLocal = () => {
    UseLocal('token').then(value => {
      if (value) {
        navigation.replace('MainScreen', {selected: 'home'});
      } else {
        navigation.replace('AuthScreen');
      }
    });
  };
  return (
    <View style={styles.main}>
      <Image
        source={minangImage}
        style={{width: FULL_WIDTH - 80, height: FULL_WIDTH - 80}}
      />
      <Text style={styles.title}>Rindu App</Text>
      <Text style={styles.describe}>
        Dima Bumi Dipijak Disitu Langik Dijinjing
      </Text>
    </View>
  );
}
const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: ColorApp.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: ColorApp.dark,
    fontSize: 28,
    fontWeight: 'bold',
  },
  describe: {
    color: ColorApp.dark,
    fontSize: 14,
  },
});

export default observer(SplashScreen);
