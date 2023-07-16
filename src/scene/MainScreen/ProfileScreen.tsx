import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useStore} from '../../store';
import {observer} from 'mobx-react-lite';
import {UserDataType, initResponProfile} from '../../store/ProfileStore';
import {ColorApp} from '../../util/color';
import {coupleIcon, editIcon, femaleIcon, maleIcon} from '../../util/picture';
import {PropScreen, RootStackParamList} from '../../Route';
import {StackNavigationProp} from '@react-navigation/stack';

function ProfileScreen({navigation}: PropScreen) {
  const profileStore = useStore('profileStore');
  const [username, setUsername] = useState('');
  const [dataUser, setDataUser] = useState<UserDataType>(initResponProfile);
  useEffect(() => {
    getLocalData();
  }, []);

  const getLocalData = () => {
    profileStore.saveUserData();
  };

  useEffect(() => {
    if (profileStore.tokenData.id != 0) {
      setUsername(profileStore.tokenData.username);
    }
  }, [profileStore.tokenData]);

  useEffect(() => {
    if (profileStore.respon.id > 0) {
      setDataUser(profileStore.respon);
    }
  }, [profileStore.respon]);
  return (
    <View style={styles.main}>
      <TopView
        name={dataUser.name}
        gender={dataUser.gender}
        navigation={navigation}
      />
      <Text>Profile</Text>
      <Text>{username}</Text>
      <Text>{dataUser.name}</Text>
    </View>
  );
}
type TopView = {
  name: string;
  gender: number;
  navigation: StackNavigationProp<RootStackParamList>;
};
const TopView = ({gender, name, navigation}: TopView) => {
  let imageIcon = coupleIcon;
  switch (gender) {
    case 1:
      imageIcon = femaleIcon;
      break;
    case 2:
      imageIcon = maleIcon;
      break;
    default:
      imageIcon = coupleIcon;
      break;
  }
  return (
    <View style={styles.topContent}>
      <Image source={imageIcon} style={styles.imageUser} />
      <Text style={styles.nameUser}>{name}</Text>
      <TouchableOpacity
        style={styles.editUser}
        onPress={() => navigation.navigate('EditUserScreen')}>
        <Image source={editIcon} style={styles.iconEdit} />
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
    height: 200,
    backgroundColor: ColorApp.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContent: {
    flex: 1,
  },
  imageUser: {
    borderWidth: 1,
    borderColor: ColorApp.dark,
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'cover',
  },
  nameUser: {
    fontSize: 18,
    color: ColorApp.dark,
    marginTop: 5,
    fontWeight: 'bold',
  },
  editUser: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
  iconEdit: {
    tintColor: ColorApp.dark,
    width: 30,
    height: 30,
  },
});
export default observer(ProfileScreen);
