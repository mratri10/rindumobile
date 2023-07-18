import React from 'react';

import { Image, Text, View, TouchableOpacity } from 'react-native';
import BaseScene from './_BaseScene';
import { ColorApp } from '../util/color';
import { RootStackParamList } from '../Route';
import { StackNavigationProp } from '@react-navigation/stack';
import { useStore } from '../store';
import { observer } from 'mobx-react-lite';

type AProp = {
  navigation: StackNavigationProp<RootStackParamList, 'AScene'>;
};
const AScene: React.FC<AProp> = ({ navigation }) => {
  const counterStore = useStore('counterStore');
  const inputStore = useStore('textInputStore');

  const add = () => {
    counterStore.increaseTimer();
  };
  return (
    <BaseScene>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text
          style={{ color: ColorApp.primary, fontWeight: 'bold', fontSize: 24 }}>
          A Secene
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('MainScreen', { selected: 'home' })}>
          <Text>A Scene {counterStore.value}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => add()}>
          <Text>A Scene {counterStore.value}</Text>
        </TouchableOpacity>
        {counterStore.getData ? <Text>Masuk</Text> : null}

        <View style={{ height: 40 }} />
        <View style={{ paddingHorizontal: 10, width: '100%' }}></View>
        <TouchableOpacity onPress={() => inputStore.onCheckError()}>
          <Text>Submit sdfa</Text>
        </TouchableOpacity>
      </View>
    </BaseScene>
  );
};

export default observer(AScene);
