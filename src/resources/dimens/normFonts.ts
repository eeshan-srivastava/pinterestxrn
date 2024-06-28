import { normText } from './DimenUtils';

export interface AppFont {
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
}

const SoraFont: AppFont = {
    300: 'Sora-Light',
    400: 'Sora-Regular',
    500: 'Sora-Medium',
    600: 'Sora-SemiBold',
    700: 'Sora-Bold',
};

const EnglishFont = {
    SoraFont: SoraFont,
};

const CUSTOM_FONT = {
    en: {
        DEFAULT: EnglishFont.SoraFont,
        SORA_FONT: EnglishFont.SoraFont,
    },
};

export enum FontWeight {
    _300 = 300,
    _400 = 400,
    _500 = 500,
    _600 = 600,
    _700 = 700,
}

export default {
    CUSTOM_FONT,
    FONT_1: normText(1),
    FONT_2: normText(2),
    FONT_3: normText(3),
    FONT_4: normText(4),
    FONT_5: normText(5),
    FONT_6: normText(6),
    FONT_7: normText(7),
    FONT_8: normText(8),
    FONT_9: normText(9),
    FONT_9_5: normText(9.5),
    FONT_10: normText(10),
    FONT_10_5: normText(10.5),
    FONT_11: normText(11),
    FONT_12: normText(12),
    FONT_13: normText(13),
    FONT_14: normText(14),
    FONT_15: normText(15),
    FONT_16: normText(16),
    FONT_17: normText(17),
    FONT_18: normText(18),
    FONT_19: normText(19),
    FONT_20: normText(20),
    FONT_22: normText(22),
    FONT_24: normText(24),
    FONT_32: normText(32),
    FONT_40: normText(40),
    FONT_28: normText(28),
    FONT_48: normText(48),
};
