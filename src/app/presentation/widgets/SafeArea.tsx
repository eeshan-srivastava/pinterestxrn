import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
    style?: ViewStyle;
    children: React.ReactNode;
}

const SafeArea = (props: Props) => {
    const { style, children } = props;

    return <SafeAreaView style={[styles.container1, style]}>{children}</SafeAreaView>;
};

export default SafeArea;

const styles = StyleSheet.create({
    container1: {
        flex: 1,
    },
});
