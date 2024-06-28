import React from 'react';
import { FlexStyle, ImageSourcePropType, ShadowStyleIOS, TransformsStyle } from 'react-native';
import FastImage, { Source } from 'react-native-fast-image';
import { ImageResizeMode, ImageViewStyle } from './ImageUtils';

interface ImageViewSource extends Source {}
interface Props {
    resizeMode?: ImageResizeMode;
    source: ImageSourcePropType | ImageViewSource;
    style: ImageViewStyle | ImageViewStyle[];
    onLoadEnd?(): void;
    onError?(): void;
    tintColor?: string;
}

const ImageView = (props: Props) => {
    const { resizeMode = ImageResizeMode.contain, source, style, tintColor, onLoadEnd, onError } = props;

    return (
        <FastImage
            source={source as any}
            style={style as any}
            resizeMode={resizeMode}
            tintColor={tintColor}
            onLoadEnd={onLoadEnd}
            onError={onError}
        />
    );
};

export default ImageView;
