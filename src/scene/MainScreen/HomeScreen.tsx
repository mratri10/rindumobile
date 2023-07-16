import React from 'react';

import {Text, View, TouchableOpacity} from 'react-native';
import BaseScene from '../_BaseScene';
import {ColorApp} from '../../util/color';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../Route';
import {useStore} from '../../store';
import {observer} from 'mobx-react-lite';
import {CLearLocal} from '../../util/localStorage';

type HomeProp = {
  navigation: StackNavigationProp<RootStackParamList>;
};
const HomeScreen: React.FC<HomeProp> = ({navigation}) => {
  const counterStore = useStore('counterStore');

  const add = () => {
    counterStore.increaseTimer();
  };
  return (
    <BaseScene>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{color: ColorApp.primary, fontWeight: 'bold', fontSize: 24}}>
          Home Secene
        </Text>
        <TouchableOpacity onPress={() => add()}>
          <Text>A Scene</Text>
          <Text>vallue {counterStore.value}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('AScene')}>
          <Text>A Scene</Text>
          <Text>detail {counterStore.value}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          CLearLocal();
          navigation.replace('SplashScreen');
        }}
        style={{padding: 20, borderWidth: 1, borderRadius: 10, margin: 20}}>
        <Text style={{textAlign: 'center'}}>Log out</Text>
      </TouchableOpacity>
    </BaseScene>
  );
};

export default observer(HomeScreen);
