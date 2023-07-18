import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {ColorApp} from '../util/color';
import {observer} from 'mobx-react-lite';
import {minangImage} from '../util/picture';
import {PropScreen} from '../Route';
import TextInputDart from '../component/TextInputApp/TextInputDart';
import {SubmitHandler, useForm} from 'react-hook-form';
import {NOSPASI, REQUIRED} from '../util/validation';
import {useStore} from '../store';

const FULL_WIDTH = Dimensions.get('screen').width;
type Inputs = {
  username: string;
};
function AuthScreen({navigation}: PropScreen) {
  const appStore = useStore('appStore');
  const {
    control,
    formState: {errors},
    handleSubmit,
  } = useForm<Inputs>();

  const submitAuth: SubmitHandler<Inputs> = data => {
    appStore.setUsername(data.username);
    navigation.navigate('SignInScreen');
  };

  return (
    <View style={styles.main}>
      <View />
      <View style={styles.content}>
        <Image
          source={minangImage}
          style={{width: FULL_WIDTH - 160, height: FULL_WIDTH - 160}}
        />
        <Text style={styles.titleText}>Rindu Kampuang</Text>
        <Text style={styles.describeText}>Ayo Bekarir Dari Kampuang</Text>
        <View style={{height: 20}} />
      </View>
      <View style={{padding: 20}}>
        <TextInputDart
          label="Username"
          name="username"
          validation={NOSPASI}
          control={control}
          error={errors}
          placeHolder="Masukan Username Anda"
        />
        <TouchableOpacity style={styles.btn} onPress={handleSubmit(submitAuth)}>
          <Text style={styles.titleBtn}> Masuk </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: ColorApp.primary,
    justifyContent: 'space-between',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  titleText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  describeText: {
    color: 'white',
    fontSize: 12,
  },
  titleInput: {
    color: 'white',
    fontWeight: 'bold',
  },
  textInput: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 10,
  },
  btn: {
    backgroundColor: ColorApp.dark,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  titleBtn: {
    color: ColorApp.primary,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default observer(AuthScreen);
