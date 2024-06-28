import React from 'react';
import { View, StyleSheet, ViewStyle, ActivityIndicator } from 'react-native';
import normDimens from '../../../../resources/dimens/normDimens';
import colorCode from '../../../../resources/colors/colorCode';
import TextView from '../textView/TextView';
import strings from '../../../../resources/strings/strings';

interface Props {
    message: string;
    style?: ViewStyle;
}

const DefaultLoadingView = (props: Props) => {
    const { message, style = { flex: 1 } } = props;

    return (
        <View style={[styles.conatiner, style]}>
            <View style={styles.container1}>
                <ActivityIndicator size="large" color={colorCode.primary} style={styles.container2} />
                <TextView style={{color:colorCode.blue}}>{message}</TextView>
            </View>
        </View>
    );
};

export default DefaultLoadingView;

const styles = StyleSheet.create({
    conatiner: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colorCode.black,
        position: 'absolute',
        flex: 1,
        width: normDimens.SCREEN_WIDTH,
        height: '100%',
    },
    container1: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        width: normDimens.SCREEN_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container2: {
        marginVertical: normDimens.DIMEN_16,
        width: normDimens.DIMEN_64,
        height: normDimens.DIMEN_64,
    },
});
