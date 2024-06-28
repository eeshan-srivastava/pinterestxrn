import { FlexStyle, ShadowStyleIOS, TransformsStyle } from 'react-native';

interface ImageViewStyle extends FlexStyle, TransformsStyle, ShadowStyleIOS {
    backfaceVisibility?: 'visible' | 'hidden';
    borderBottomLeftRadius?: number;
    borderBottomRightRadius?: number;
    backgroundColor?: string;
    borderColor?: string;
    borderWidth?: number;
    borderRadius?: number;
    borderTopLeftRadius?: number;
    borderTopRightRadius?: number;
    overlayColor?: string;
    tintColor?: string;
    opacity?: number;
}

enum ImageResizeMode {
    cover = 'cover',
    stretch = 'stretch',
    center = 'center',
    contain = 'contain',
}

export { ImageResizeMode, type ImageViewStyle };
