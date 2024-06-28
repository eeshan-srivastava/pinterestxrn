import React from 'react';
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import LinearGradient from 'react-native-linear-gradient';
import { ActivityIndicator } from 'react-native-paper';
import normFonts, { FontWeight } from '../../../../resources/dimens/normFonts';
import { ButtonStateType } from './ButtonStateUtils';
import colorCode from '../../../../resources/colors/colorCode';
import { Ripple } from '../../../../utils/AppImports';
import TextView from '../textView/TextView';
import normDimens from '../../../../resources/dimens/normDimens';
import ColorUtils from '../../../../resources/colors/ColorUtils';

interface Props {
    style?: ViewStyle;
    buttonActiveStyle?: ViewStyle;
    buttonInActiveStyle?: ViewStyle;
    activeGradient?: Array<string>;
    inactiveGradient?: Array<string>;
    inactiveSplitLocations?: Array<number>;
    activeSplitLocations?: Array<number>;
    buttonActiveTextStyle?: TextStyle;
    buttonInActiveTextStyle?: TextStyle;
    buttonText?: string;
    enabled?: boolean;
    angle?: number;
    useAngle?: boolean;
    onClick: () => void;
    dropShadow?: boolean;
    shadowColor?: string;
    shadowOpacity?: number;
    shadowRadius?: number;
    children?: React.ReactNode;
    buttonActiveTextFontWeight?: FontWeight;
    buttonInActiveTextFontWeight?: FontWeight;
    buttonState?: ButtonStateType;
    loaderColor?: string;
}

const Button = (props: Props) => {
    const {
        style = {},
        buttonActiveStyle = styles.container4,
        buttonInActiveStyle = styles.container5,
        // activeGradient = ['#2E2E2E', '#161616', '#000000'],
        // activeGradient = ['#141310', '#141310', '#141310'],
        activeGradient = [colorCode.primary, colorCode.primary, colorCode.primary],
        inactiveGradient = ['#B5B5B5', '#7D7D7D', '#454545'],
        inactiveSplitLocations = [0, 0.5, 1],
        activeSplitLocations = [0, 0.5, 1],
        buttonActiveTextStyle = styles.text1,
        buttonInActiveTextStyle = styles.text2,
        buttonText = 'Button',
        enabled = true,
        angle = 130,
        useAngle = true,
        onClick = () => {},
        dropShadow = true,
        children = null,
        shadowOpacity = 0.6,
        shadowRadius = 2,
        shadowColor = colorCode.black,
        buttonActiveTextFontWeight = FontWeight._400,
        buttonInActiveTextFontWeight = FontWeight._400,
        buttonState = ButtonStateType.SUCCESS,
        loaderColor = colorCode.white,
    } = props;

    const splitLocations = enabled ? activeSplitLocations : inactiveSplitLocations;
    const buttonTextStyle = enabled ? buttonActiveTextStyle : buttonInActiveTextStyle;
    const gradient = enabled ? activeGradient : inactiveGradient;
    const buttonStyle = enabled ? buttonActiveStyle : buttonInActiveStyle;
    const buttonTextFontWeight = enabled ? buttonActiveTextFontWeight : buttonInActiveTextFontWeight;

    const handlePress = () => {
        onClick();
    };

    return (
        <View style={[style, styles.container3]}>
            <DropShadow
                style={[
                    styles.container1,
                    { shadowColor: shadowColor, shadowOpacity: shadowOpacity, shadowRadius: shadowRadius },
                    dropShadow === false && {
                        shadowOffset: {
                            width: 0,
                            height: 0,
                        },
                        shadowColor: colorCode.transparent,
                        shadowOpacity: 0,
                        shadowRadius: 0,
                    },
                ]}>
                <View style={[buttonStyle, { overflow: 'hidden' }]}>
                    <LinearGradient
                        colors={gradient}
                        locations={splitLocations}
                        style={[{ height: buttonStyle.height, width: buttonStyle.width }]}>
                        <Ripple
                            onPress={handlePress}
                            opacity={0.2}
                            duration={50}
                            centered={true}
                            color={colorCode.black}
                            containerStyle={[{ height: buttonStyle.height, width: buttonStyle.width }]}
                            slowDuration={50}
                            max={800}
                            disabled={!enabled}
                        />
                    </LinearGradient>
                </View>
            </DropShadow>
            <View
                style={[
                    { height: buttonStyle.height, width: buttonStyle.width, position: 'absolute' },
                    styles.container3,
                ]}
                pointerEvents="none">
                <>
                    {buttonState === ButtonStateType.SUCCESS ? (
                        <>
                            {children ? (
                                <>{children}</>
                            ) : (
                                <TextView style={buttonTextStyle} fontWeight={buttonTextFontWeight}>
                                    {buttonText}
                                </TextView>
                            )}
                        </>
                    ) : (
                        <ActivityIndicator animating={true} color={loaderColor} size={'small'} />
                    )}
                </>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    text1: {
        // fontFamily: normFonts.CUSTOM_FONT.en.LEXEND_DECA_FONT[400],
        fontSize: normFonts.FONT_12,
        // lineHeight: normFonts.FONT_24,
        color: colorCode.white,
        //backgroundColor:'red'
    },
    container1: {
        shadowOffset: {
            width: 0,
            height: normDimens.DIMEN_2,
        },
    },
    container3: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    text2: {
        //fontFamily: normFonts.CUSTOM_FONT.en.LEXEND_DECA_FONT[400],
        fontSize: normFonts.FONT_16,
        //lineHeight: normFonts.FONT_20,
        color: ColorUtils.getAlphaColor({ colorCode: colorCode.black, opacityPercent: 60 }),
        // alignSelf: 'center',
    },
    container4: {
        width: normDimens.DIMEN_328,
        height: normDimens.DIMEN_50,
        overflow: 'hidden',
        borderRadius: normDimens.DIMEN_8,
    },
    container5: {
        width: normDimens.DIMEN_328,
        height: normDimens.DIMEN_50,
        overflow: 'hidden',
        borderRadius: normDimens.DIMEN_8,
        // borderColor: 'black',
        // borderWidth: normDimens.DIMEN_2,
    },
});

export default Button;
