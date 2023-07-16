import {observer} from 'mobx-react-lite';
import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  Text,
} from 'react-native';
import {ColorApp} from '../../util/color';
import {homeIcon, profileIcon, transactionIcon} from '../../util/picture';
import HomeScreen from './HomeScreen';
import {StackNavigationProp} from '@react-navigation/stack';
import {BottomKey, RootStackParamList} from '../../Route';
import {RouteProp} from '@react-navigation/native';
import ProfileScreen from './ProfileScreen';

type MainProp = {
  navigation: StackNavigationProp<RootStackParamList>;
  route: RouteProp<RootStackParamList>;
};
function MainScreen({navigation, route}: MainProp) {
  const selected = route.params?.selected;
  const [bottom, setBottom] = useState(selected ?? 'home');
  return (
    <View style={styles.main}>
      <ScrollView>
        <ViewSelected navigation={navigation} selected={bottom} />
      </ScrollView>
      <BottomView selectName={bottom} onPress={v => setBottom(v)} />
    </View>
  );
}
type ViewProp = {
  navigation: StackNavigationProp<RootStackParamList>;
  selected: string;
};
const ViewSelected = ({navigation, selected}: ViewProp) => {
  switch (selected) {
    case 'home':
      return <HomeScreen navigation={navigation} />;

    case 'profile':
      return <ProfileScreen navigation={navigation} />;
    default:
      return <Text>Transaksi</Text>;
  }
};

type BottomType = {
  selectName: string;
  onPress: (v: BottomKey) => void;
};
const BottomView = ({selectName, onPress}: BottomType) => {
  return (
    <View style={styles.bottom}>
      <BottomChild
        selected={selectName == 'home'}
        image={homeIcon}
        name="home"
        label="Beranda"
        onPress={onPress}
      />
      <BottomChild
        selected={selectName == 'transaction'}
        image={transactionIcon}
        name="transaction"
        label="Transaksi"
        onPress={onPress}
      />
      <BottomChild
        selected={selectName == 'profile'}
        image={profileIcon}
        name="profile"
        label="Profil"
        onPress={onPress}
      />
    </View>
  );
};
type BottomItemType = {
  image: ImageSourcePropType;
  selected: boolean;
  name: BottomKey;
  label: string;
  onPress: (v: BottomKey) => void;
};
const BottomChild = ({
  image,
  selected,
  name,
  onPress,
  label,
}: BottomItemType) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(name)}
      style={[
        styles.bottomItem,
        selected ? styles.bottomSelected : styles.bottomUnSelected,
      ]}>
      <Image source={image} style={[styles.imageBottom]} />
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: ColorApp.light,
  },
  bottom: {
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  imageBottom: {
    height: 20,
    width: 20,
    tintColor: ColorApp.dark,
  },
  bottomItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
  },
  bottomSelected: {
    borderTopWidth: 3,
    borderTopColor: ColorApp.dark,
  },
  bottomUnSelected: {
    borderTopWidth: 3,
    borderTopColor: 'white',
  },
  nameBottom: {
    color: ColorApp.dark,
  },
});

export default observer(MainScreen);
