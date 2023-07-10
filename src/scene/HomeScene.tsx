import React from 'react';

import { Image, Text, View, TouchableOpacity } from 'react-native';
import { infoIcon, splashImage } from '../util/picture';
import BaseScene from './_BaseScene';
import { ColorApp } from '../util/color';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../Route';

type HomeProp = {
    navigation: StackNavigationProp<RootStackParamList, 'Home'>
}
const HomeScreen: React.FC<HomeProp> = ({ navigation }) => {

    const rightHeader = <Image source={infoIcon} style={{ width: 30, height: 30 }} />
    return (
        <BaseScene>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: ColorApp.primary, fontWeight: 'bold', fontSize: 24 }}>Home Secene</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Detail')}>
                    <Text>A Scene</Text>

                </TouchableOpacity>
            </View>
        </BaseScene>
    )
}

export default HomeScreen