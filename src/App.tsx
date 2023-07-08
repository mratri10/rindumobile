import React from 'react';
import BaseScene from './scene/BaseScene';
import { Text, View } from 'react-native';

const App: React.FC = () => {
  return (
    <BaseScene header={{ title: 'App' }}>
      <View><Text>Hello, World!</Text></View>
    </BaseScene>
  )
}

export default App