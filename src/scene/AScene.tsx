import React from 'react';

import { Image, Text, View, TouchableOpacity } from 'react-native';
import BaseScene from './_BaseScene';
import { ColorApp } from '../util/color';
import { RootStackParamList } from '../Route';
import { StackNavigationProp } from '@react-navigation/stack';

type AProp = {
    navigation: StackNavigationProp<RootStackParamList, 'Detail'>
}
const AScene: React.FC<AProp> = ({ navigation }) => {

    return (
        <BaseScene>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: ColorApp.primary, fontWeight: 'bold', fontSize: 24 }}>A Secene</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Text>A Scene</Text>
                </TouchableOpacity>
            </View>
        </BaseScene>
    )
}

export default AScene