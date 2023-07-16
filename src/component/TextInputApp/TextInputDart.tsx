import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import BaseTextInput, {BaseInputType} from './BaseTextInput';
import {ColorApp} from '../../util/color';
import {useStore} from '../../store';
import {observer} from 'mobx-react-lite';
import {eye, eyeHide} from '../../util/picture';

function TextInputDart(data: BaseInputType) {
  const appStore = useStore('appStore');

  return (
    <View>
      {data.label && appStore.inputFocus == data.name ? (
        <Text style={styles.label}>{data.label}</Text>
      ) : null}
      <BaseTextInput
        {...data}
        contentStyle={[styles.content, styles.contentLight]}
        errorStyle={[styles.error]}
        viewStyle={styles.view}
        inputStyle={[styles.input, data.inputStyle]}
        placeHolderColor={ColorApp.dark_input}
        content={
          data.setSecure ? (
            <SecureView isSecure={data.isSecure} onPress={data.onSecure} />
          ) : null
        }
      />
    </View>
  );
}

type SecureType = {
  isSecure?: boolean;
  onPress?: () => void;
};
const SecureView = ({isSecure, onPress}: SecureType) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Image
        source={isSecure ? eyeHide : eye}
        style={styles.imageSecure}
        tintColor={ColorApp.dark}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  content: {
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentLight: {
    borderColor: ColorApp.dark,
  },
  error: {
    fontSize: 12,
    color: ColorApp.error_light,
    marginTop: 2,
    textAlign: 'center',
  },
  view: {
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    color: ColorApp.dark,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    color: ColorApp.dark,
    flex: 1,
  },
  imageSecure: {
    height: 30,
    width: 30,
  },
});

export default observer(TextInputDart);
