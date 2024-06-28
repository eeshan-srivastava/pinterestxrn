// @ts-nocheck
import alphaCode from './alphaCode';

const getAlphaColor = (params: { colorCode: string; opacityPercent: any }): string => {
    const { colorCode, opacityPercent } = params;
    var color = colorCode + alphaCode.alphaTransparencyCodes[opacityPercent];
    return color;
};

export default { getAlphaColor };
