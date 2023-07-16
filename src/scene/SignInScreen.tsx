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
import {SubmitHandler, useForm} from 'react-hook-form';
import {MIN3, REQUIRED} from '../util/validation';
import TextInputDart from '../component/TextInputApp/TextInputDart';
import appStore from '../store/AppStore';
import {useStore} from '../store';
import {SaveLocal} from '../util/localStorage';

const FULL_WIDTH = Dimensions.get('screen').width;
type Inputs = {
  password: string;
  password_confirm: string;
};
function SignIn({navigation}: PropScreen) {
  const authStore = useStore('authStore');
  const appStore = useStore('appStore');

  const [showError, setShowError] = React.useState(false);
  const [messageError, setMessageError] = React.useState('');
  const [secure, setSecure] = React.useState(true);
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async data => {
    await authStore.postSignIn({
      username: appStore.username,
      password: data.password,
    });
  };

  React.useEffect(() => {
    if (authStore.respon) {
      SaveLocal('token', authStore.respon);
      navigation.replace('MainScreen', {selected: 'home'});
    }
  }, [authStore.respon]);

  React.useEffect(() => {
    if (authStore.respon_error.message) {
      setShowError(true);
      setMessageError(authStore.respon_error.message);
    }
  }, [authStore.respon_error]);
  return (
    <View style={styles.main}>
      <View />
      <View style={styles.content}>
        <Image
          source={minangImage}
          style={{width: FULL_WIDTH - 200, height: FULL_WIDTH - 250}}
        />
        <Text style={styles.titleText}>Selamat Datang Kembali</Text>
        <View style={{marginTop: -6}} />
        <Text style={styles.titleText}>{appStore.username}</Text>
        <View style={{height: 10}} />
        <Text style={styles.describeText}>Silahkan masukan password Anda</Text>
        <View style={{height: 20}} />
      </View>
      <View style={{padding: 20}}>
        <TextInputDart
          label="Password"
          name="password"
          validation={REQUIRED}
          control={control}
          error={errors}
          placeHolder="Masukan Password"
          setSecure={true}
          isSecure={secure}
          onSecure={() => setSecure(!secure)}
        />
        {showError ? (
          <Text style={styles.textError}>{messageError}</Text>
        ) : null}
        <View style={{height: 15}} />

        <TouchableOpacity style={styles.btn} onPress={handleSubmit(onSubmit)}>
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
  textError: {
    color: ColorApp.error_light,
    textAlign: 'center',
  },
});

export default observer(SignIn);
