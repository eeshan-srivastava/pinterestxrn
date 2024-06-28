import React from 'react';
import { StyleSheet, ViewStyle, ReturnKeyTypeOptions, ColorValue } from 'react-native';
import { TextInput } from 'react-native-paper';
import { KeyboardTypes } from './KeyboardUtils';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import colorCode from '../../../../resources/colors/colorCode';
import normFonts from '../../../../resources/dimens/normFonts';
import ColorUtils from '../../../../resources/colors/ColorUtils';

interface Props {
    disabled?: boolean;
    keyboardType?: KeyboardTypes;
    onTextChanged: (text: string) => void;
    textStyle?: {
        width?: number;
        height?: number;
        fontSize?: number;
        backgroundColor?: string;
        flex?: number;
        textDecorationLine?: string;
        color?: ColorValue | undefined;
        marginHorizontal?: number;
        borderBottomColor?: string;
        borderBottomWidth?: number;
    };
    text?: string;
    maxLength?: number;
    dense?: boolean;
    noOfLines?: number;
    placeholder?: string;
    mode?: 'flat' | 'outlined' | undefined;
    placeholderTextColor?: string;
    textInputTheme?: {
        colors?: {
            primary?: string;
            text?: string;
            background?: string;
            underlineColor?: string;
            activeUnderlineColor?: string;
            selectionColor?: string;
            placeholder?: string;
        };
        fonts?: {
            regular: {
                fontFamily?: string;
            };
        };
    };
    underlineColor?: string;
    activeUnderlineColor?: string;
    showSoftInputOnFocus?: boolean;
    autoFocus?: boolean;
    returnKeyType?: ReturnKeyTypeOptions;
    selectionColor?: string;
    label?: string;
    onFocus?: () => void;
    onBlur?: () => void;
    multiline?: boolean;
    cursorColor?: string;
    textColor?: string;
}

const defaultTextInputTheme = {
    colors: {
        primary: colorCode.white,
        text: colorCode.white,
        background: colorCode.transparent,
    },
    fonts: {
        regular: {
            fontFamily: normFonts.CUSTOM_FONT.en.DEFAULT[400],
        },
    },
};

const defaultTextStyle = {
    // fontSize: normFonts.FONT_16,
    // backgroundColor: Colors.BLACK,
    // minHeight: normDimens.DIMEN_48,
    // maxHeight: normDimens.DIMEN_60,
};

const EditText = (props: Props) => {
    const {
        onTextChanged = (text: string) => {},
        disabled = false,
        textStyle = defaultTextStyle,
        text,
        maxLength = 8,
        dense = false,
        noOfLines = 1,
        placeholder = '',
        mode = undefined,
        placeholderTextColor = ColorUtils.getAlphaColor({colorCode: colorCode.white, opacityPercent:60}),
        textInputTheme = defaultTextInputTheme,
        underlineColor = colorCode.transparent,
        activeUnderlineColor = colorCode.transparent,
        showSoftInputOnFocus = true,
        keyboardType = KeyboardTypes.DEFAULT,
        autoFocus = false,
        returnKeyType = 'done',
        selectionColor = colorCode.white,
        label,
        onFocus = () => {},
        onBlur = () => {},
        multiline,
        cursorColor = colorCode.black,
        textColor = colorCode.blue,
    } = props;

    const onChangeText = (text: string) => {
        onTextChanged(text);
    };

    return (
        <TextInput
            disabled={disabled}
            style={textStyle}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            mode={mode}
            dense={dense}
            theme={textInputTheme}
            underlineColor={underlineColor}
            activeUnderlineColor={activeUnderlineColor}
            maxLength={maxLength}
            value={text}
            onChangeText={onChangeText}
            numberOfLines={noOfLines}
            showSoftInputOnFocus={showSoftInputOnFocus}
            autoFocus={autoFocus}
            returnKeyType={returnKeyType}
            selectionColor={selectionColor}
            label={label}
            keyboardType={keyboardType}
            onFocus={onFocus}
            onBlur={onBlur}
            multiline={multiline}
            cursorColor={cursorColor}
            textColor={textColor}
        />
    );
};

const styles = StyleSheet.create({});

export default EditText;
