import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {observer} from 'mobx-react-lite';
import {ColorApp} from '../util/color';
import {
  cakeIcon,
  cameraIcon,
  closeIcon,
  femaleMaleIcon,
  profileIcon,
} from '../util/picture';
import {useStore} from '../store';
import {UserDataType, initResponProfile} from '../store/ProfileStore';
import {PropScreen, RootStackParamList} from '../Route';
import {StackActionType} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import TextInputDart from '../component/TextInputApp/TextInputDart';
import {Control, FieldErrors, SubmitHandler, useForm} from 'react-hook-form';
import {NOSPASI, REQUIRED} from '../util/validation';
import DateInputApp, {convertDate} from '../component/InputApp/DateInputApp';
import DropDownInput from '../component/InputApp/DropDownInput';

type InputUser = {
  name: string;
};
function EditProfileScreen({navigation}: PropScreen) {
  const profileStore = useStore('profileStore');
  const [dataUser, setDataUser] = useState<UserDataType>(initResponProfile);

  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<InputUser>();

  useEffect(() => {
    setDataUser(profileStore.respon);
  }, []);

  const onSubmit: SubmitHandler<InputUser> = data => {
    console.log('++++++++ ', dataUser);
    console.log('++++++++ ', data);
  };
  return (
    <View style={styles.main}>
      <TopView
        nameUser={dataUser.name}
        gender={dataUser.gender}
        navigation={navigation}
        control={control}
        errors={errors}
      />
      <View style={{margin: 20}}>
        {dataUser.name ? (
          <TextInputDart
            name="name"
            validation={REQUIRED}
            control={control}
            error={errors}
            placeHolder={'Masukan Nama Anda'}
            defaultValue={dataUser.name}
            inputStyle={{textAlign: 'right', paddingVertical: 4}}
            icon={profileIcon}
          />
        ) : null}
        <View style={{height: 10}} />
        {dataUser.birthday ? (
          <DateInputApp
            error={errors}
            control={control}
            name="birthday"
            icon={cakeIcon}
            validation={REQUIRED}
            defaultValue={convertDate(dataUser.birthday)}
          />
        ) : null}
        <View style={{height: 10}} />
        {dataUser.gender ? (
          <DropDownInput
            content={['Pria', 'Wanita']}
            name="gender"
            error={errors}
            control={control}
            icon={femaleMaleIcon}
            placeholder="Masukan Jenis Kelamin Anda"
            defaultValue={dataUser.gender}
          />
        ) : null}
      </View>
      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <Text>Simpan</Text>
      </TouchableOpacity>
    </View>
  );
}
type TopView = {
  nameUser: string;
  gender: number;
  navigation: StackNavigationProp<RootStackParamList>;
  control: Control<InputUser>;
  errors: FieldErrors<InputUser>;
};
const TopView = ({gender, nameUser, navigation, control, errors}: TopView) => {
  return (
    <View style={styles.topContent}>
      <View style={styles.viewImage}>
        <Image source={cameraIcon} style={styles.imageUser} />
      </View>
      <TouchableOpacity
        style={styles.cancelEdit}
        onPress={() => navigation.goBack()}>
        <Image source={closeIcon} style={styles.iconClose} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: ColorApp.light,
  },
  topContent: {
    backgroundColor: ColorApp.primary,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
  },
  bottomContent: {
    flex: 1,
  },
  imageUser: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    tintColor: ColorApp.dark,
  },
  viewImage: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: ColorApp.dark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameUser: {
    fontSize: 18,
    color: ColorApp.dark,
    marginTop: 5,
    fontWeight: 'bold',
  },
  cancelEdit: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  iconClose: {
    tintColor: ColorApp.dark,
    width: 15,
    height: 15,
  },
});
export default observer(EditProfileScreen);
