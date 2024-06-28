import React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import strings from '../../../../resources/strings/strings';
import ImageView from '../imageView/ImageView';
import imageFile from '../../../../resources/images/imageFile';
import colorCode from '../../../../resources/colors/colorCode';
import normDimens from '../../../../resources/dimens/normDimens';
import normFonts from '../../../../resources/dimens/normFonts';
import Button from '../button/Button';
import TextView from '../textView/TextView';

interface Props {
    primaryText?: string;
    secondaryText?: string;
    style?: ViewStyle;
    onRetry?: () => void;
    onBackPress?: () => void;
    backButtonVisible?: boolean;
}

const DefaultErrorView = (props: Props) => {
    const {
        primaryText = strings.oops,
        secondaryText = strings.something_went_wrong,
        style = { flex: 1 },
        onRetry = () => {},
        onBackPress = () => {},
        backButtonVisible = false,
    } = props;

    return (
        <View style={[styles.conatiner, style]}>
            <ImageView source={imageFile.IMG_ERROR} style={styles.container1} />
            <TextView style={styles.primaryText}>{primaryText}</TextView>
            <TextView style={styles.secondaryText} numberOfLines={2}>
                {secondaryText}
            </TextView>
            <View style={backButtonVisible ? styles.container8 : styles.container10}>
                {backButtonVisible ? (
                    <Button
                        buttonText={strings.back}
                        onClick={onBackPress}
                        dropShadow={false}
                        enabled={true}
                        style={styles.container9}
                        buttonActiveStyle={{
                            width: normDimens.DIMEN_100,
                            height: normDimens.DIMEN_36,
                            borderRadius: normDimens.DIMEN_60,
                        }}
                    />
                ) : null}
                <Button
                    buttonText={strings.retry}
                    onClick={onRetry}
                    dropShadow={false}
                    enabled={true}
                    style={styles.container9}
                    buttonActiveStyle={{
                        width: normDimens.DIMEN_100,
                        height: normDimens.DIMEN_36,
                        borderRadius: normDimens.DIMEN_60,
                    }}
                />
            </View>
        </View>
    );
};

export default DefaultErrorView;

const styles = StyleSheet.create({
    conatiner: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        backgroundColor: colorCode.black,
    },
    container1: {
        width: normDimens.DIMEN_260,
        aspectRatio: 0.68965,
        marginTop: normDimens.DIMEN_50,
    },
    primaryText: {
        color: colorCode.grey_808080,
        lineHeight: normDimens.DIMEN_32,
        marginTop: -normDimens.DIMEN_60,
    },
    secondaryText: {
        color: colorCode.grey_808080,
        lineHeight: normDimens.DIMEN_22,
        marginTop: normDimens.DIMEN_8,
        marginHorizontal: normDimens.DIMEN_24,
        textAlign: 'center',
    },
    container2: {
        width: normDimens.DIMEN_160,
        height: normDimens.DIMEN_40,
        borderRadius: normDimens.DIMEN_8,
    },
    text1: {
        color: colorCode.black3,
        fontSize: normFonts.FONT_12,
        lineHeight: normDimens.DIMEN_16,
        textAlign: 'center',
        alignSelf: 'center',
    },
    container3: {
        marginTop: normDimens.DIMEN_24,
    },
    container7: {
        position: 'absolute',
        top: normDimens.DIMEN_16,
        start: normDimens.DIMEN_16,
    },
    container8: {
        display: 'flex',
        flexDirection: 'row',
        width: normDimens.DIMEN_328,
        justifyContent: 'space-evenly',
        marginTop: normDimens.DIMEN_32,
    },
    container9: {
        alignSelf: 'center',
    },
    container10: {
        display: 'flex',
        flexDirection: 'column',
        width: normDimens.DIMEN_328,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: normDimens.DIMEN_32,
    },
});
