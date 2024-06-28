import React from 'react';
import { Text, TextStyle } from 'react-native';
import normFonts, { FontWeight } from '../../../../resources/dimens/normFonts';

interface Props {
    children: string;
    style?: TextStyle;
    numberOfLines?: number;
    ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip' | undefined;
    fontWeight?: FontWeight;
    onClick?: () => void;
    extraLineHeight?: number;
    autoStyle?: boolean;
}

const getFont = (params: { fontWeight: FontWeight }) => {
    return normFonts.CUSTOM_FONT['en'].DEFAULT[params.fontWeight];
};

const getLineHeight = (params: { fontSize: number }) => {
    return params.fontSize + params.fontSize * 0.2;
};

const TextView = (props: Props) => {
    const {
        children,
        style = { fontSize: normFonts.FONT_12 },
        numberOfLines,
        ellipsizeMode,
        fontWeight = FontWeight._400,
        onClick = () => {},
        extraLineHeight = 0,
        autoStyle = true,
    } = props;

    let _fontSize = (style as any).fontSize || normFonts.FONT_12;
    let _fontFamily = getFont({ fontWeight: fontWeight });
    let _lineHeight = getLineHeight({ fontSize: _fontSize });

    return (
        <Text
            style={[
                autoStyle === true && style,
                { fontSize: _fontSize, fontFamily: _fontFamily, lineHeight: _lineHeight + extraLineHeight },
                autoStyle === false && style,
            ]}
            numberOfLines={numberOfLines}
            ellipsizeMode={ellipsizeMode}
            onPress={onClick}>
            {children}
        </Text>
    );
};

export default TextView;
