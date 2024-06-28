import { Dimensions, PixelRatio, Platform } from 'react-native';
import { mobileCheck } from '../../utils/DeviceUtils';

const windowWidth = Dimensions.get('window')?.width;
const windowHeight = Dimensions.get('window')?.height;
const webWidth = mobileCheck() ? windowWidth : Math.min(windowWidth, Math.floor((3 * windowHeight) / 4));

const DESIGN_WIDTH: number = 360;
const DESIGN_HEIGHT: number = 720;

const normGeneral = (size: number): number => {
    let widthActual = Platform.OS === 'web' && mobileCheck() ? webWidth : windowWidth;
    let scale = widthActual / DESIGN_WIDTH;
    let newSize = size * scale;
    let finalSize =
        Platform.OS === 'web' && !mobileCheck() ? size : Math.round(PixelRatio.roundToNearestPixel(newSize));
    return finalSize;
};

const normText = (size: number): number => {
    let widthActual = Platform.OS === 'web' && mobileCheck() ? webWidth : windowWidth;
    let scale = widthActual / DESIGN_WIDTH;
    const pixelRatio = PixelRatio.getFontScale();
    let newSize = size * scale;
    let finalSize =
        Platform.OS === 'web' && !mobileCheck()
            ? size
            : Math.round(PixelRatio.roundToNearestPixel(newSize)) / pixelRatio;
    return finalSize;
};

export { windowWidth, windowHeight, webWidth, DESIGN_WIDTH, DESIGN_HEIGHT, normGeneral, normText };
