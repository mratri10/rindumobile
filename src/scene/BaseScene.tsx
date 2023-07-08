import React, { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type BaseType = {
    header?: HeaderType
    children: ReactNode
}
const BaseScene: React.FC<BaseType> = ({ header, children }) => {
    return (
        <View style={styles.main}>
            {header ?
                <RenderHeader
                    title={header.title}
                    rightHeader={header.rightHeader}
                    backPress={header.backPress} /> :
                <View />}
            <View style={styles.content}>
                {children}
            </View>
        </View>
    )
}

type HeaderType = {
    title: string
    rightHeader?: any
    backPress?: boolean
}
const RenderHeader = ({ title, rightHeader, backPress }: HeaderType) => {
    return (
        <View style={styles.header}>
            {backPress ? <View>
                <Text>Back</Text>
            </View> : <View />}
            <Text>{title}</Text>
            {rightHeader ? rightHeader : <View />}
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#d2d2d2'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    content: {
        flex: 1
    }
})



export default BaseScene