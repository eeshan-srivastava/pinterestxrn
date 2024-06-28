import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import colorCode from '../../../../../resources/colors/colorCode';
import normDimens from '../../../../../resources/dimens/normDimens';
import normFonts from '../../../../../resources/dimens/normFonts';
import { ImageResizeMode } from '../../imageView/ImageUtils';
import ImageView from '../../imageView/ImageView';
import LinearGradient from 'react-native-linear-gradient';
import ColorUtils from '../../../../../resources/colors/ColorUtils';

interface Props {
    onClick: () => void;
    icon: any;
    label: string;
    tint?: any;
    style?: ViewStyle;
    width?: number;
    height?: number;
    showGradient?: boolean;
    customImage?: boolean;
}

const ReactBottomNavItem = (props: Props) => {
    const {
        onClick = () => {},
        icon,
        label,
        tint,
        style,
        width = normDimens.SCREEN_WIDTH,
        height = normDimens.DIMEN_60,
        showGradient = false,
        customImage = false,
    } = props;

    return (
        <TouchableOpacity
            style={[styles.tabContainer, style, { width: width, height: height }]}
            onPress={onClick}>
            <View>
                {showGradient ? (
                    <View
                        style={[
                            {
                                width: width,
                                height: height,
                                transform: [{ rotate: '180deg' }],
                                opacity: 0.8,
                                position: 'absolute',
                            },
                        ]}>
                        <LinearGradient
                            colors={[ ColorUtils.getAlphaColor({colorCode: colorCode.blue, opacityPercent:30}), colorCode.transparent]}
                            style={[styles.tabContainer, { width: width, height: height }]}
                            locations={[0.1, 1]}
                        />
                    </View>
                ) : null}
                <View style={[styles.tabContainer, { width: width, height: height }]}>
                    {customImage ? (
                        <View style={styles.circleShape}>
                            <ImageView
                                style={styles.icon2}
                                source={icon}
                                resizeMode={ImageResizeMode.cover}
                            />
                        </View>
                    ) : (
                        <ImageView style={styles.icon} source={icon} tintColor={tint} />
                    )}
                    <Text style={[styles.label, { color: tint }]}>{label}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ReactBottomNavItem;

const styles = StyleSheet.create({
    tabContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: normDimens.DIMEN_24,
        height: normDimens.DIMEN_24,
    },
    icon2: {
        width: normDimens.DIMEN_24,
        height: normDimens.DIMEN_24,
    },
    label: {
        fontSize: normDimens.DIMEN_10,
        lineHeight: normDimens.DIMEN_13,
        marginTop: normDimens.DIMEN_4,
        fontFamily: normFonts.CUSTOM_FONT.en.DEFAULT[400],
    },
    circleShape: {
        width: normDimens.DIMEN_20,
        height: normDimens.DIMEN_20,
        borderRadius: normDimens.DIMEN_10,
        backgroundColor: colorCode.black,
        overflow: 'hidden',
    },
});
