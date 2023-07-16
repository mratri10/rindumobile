import React, {ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import {ColorApp} from '../util/color';

type BaseType = {
  children: ReactNode;
};
const BaseScene: React.FC<BaseType> = ({children}) => {
  return (
    <View style={styles.main}>
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#d2d2d2',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: ColorApp.primary,
    padding: 20,
  },
  titleHeader: {
    color: ColorApp.dark,
    fontWeight: 'bold',
    fontSize: 20,
  },
  content: {
    flex: 1,
  },
  backHeader: {
    width: 30,
    height: 30,
    tintColor: ColorApp.dark,
  },
});

export default BaseScene;
