import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import colorCode from '../../../resources/colors/colorCode';
import ColorUtils from '../../../resources/colors/ColorUtils';
import normDimens from '../../../resources/dimens/normDimens';
import normFonts, { FontWeight } from '../../../resources/dimens/normFonts';
import { ImageResizeMode } from '../widgets/imageView/ImageUtils';
import ImageView from '../widgets/imageView/ImageView';
import TextView from '../widgets/textView/TextView';
import { PhotoItemBean } from '../bean/PhotoBean';

interface Props {
    item: PhotoItemBean;
    style?: ViewStyle;
    onClickItem?: (item: PhotoItemBean) => void;
    isFavourite?: boolean;
}

const PhotoItemView = (props: Props) => {
    const { item, style, onClickItem = () => {}, isFavourite = false } = props;

    return (
        <TouchableOpacity
            style={[styles.container1, style]}
            onPress={() => {
                onClickItem(item);
            }}
            activeOpacity={0.7}>
            <View style={styles.container4} pointerEvents={'none'}>
                <ImageView
                    source={{ uri: item.urls.regular }}
                    style={{ ...styles.container2, ...{ aspectRatio: item.width / item.height } }}
                    resizeMode={ImageResizeMode.contain}
                />
                {/* <View style={styles.container5}>
                    <TextView
                        style={styles.text1}
                        fontWeight={FontWeight._700}
                        ellipsizeMode='tail'
                        numberOfLines={1}
                        extraLineHeight={normFonts.FONT_2}>{item.alternative_slugs.en}
                    </TextView>
                    <TextView
                        style={styles.text2}
                        fontWeight={FontWeight._400}
                        ellipsizeMode='tail'
                        numberOfLines={1}
                        extraLineHeight={normFonts.FONT_2}>{'Released On : '+item.created_at}
                    </TextView>
                    <TextView
                        style={styles.text3}
                        fontWeight={FontWeight._400}
                        ellipsizeMode='tail'
                        numberOfLines={1}
                        extraLineHeight={normFonts.FONT_2}>{'Rating : '+item.likes}
                    </TextView>
                </View> */}
            </View>
        </TouchableOpacity>
    );
};

export default PhotoItemView;

const styles = StyleSheet.create({
    container1: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flex: 1,
    },
    container2: {
        borderRadius: normDimens.DIMEN_0,
        width: '100%',
    },
    text1: {
        fontSize: normFonts.FONT_16,
        color: ColorUtils.getAlphaColor({ colorCode: colorCode.white, opacityPercent: 80 }),
        marginTop: normDimens.DIMEN_8,
        maxWidth: normDimens.SCREEN_WIDTH / 2 - normDimens.DIMEN_16,
    },
    text2: {
        fontSize: normFonts.FONT_10,
        color: ColorUtils.getAlphaColor({ colorCode: colorCode.white, opacityPercent: 60 }),
        marginTop: normDimens.DIMEN_8,
        maxWidth: normDimens.SCREEN_WIDTH / 2 - normDimens.DIMEN_16,
    },
    text3: {
        fontSize: normFonts.FONT_10,
        color: ColorUtils.getAlphaColor({ colorCode: colorCode.white, opacityPercent: 60 }),
        marginTop: normDimens.DIMEN_8,
        maxWidth: normDimens.SCREEN_WIDTH / 2 - normDimens.DIMEN_16,
    },
    container4: {
        flexDirection: 'column',
        alignItems: 'center',
        width: '96%',
        borderRadius: normDimens.DIMEN_8,
        backgroundColor: ColorUtils.getAlphaColor({ colorCode: colorCode.grey_363636, opacityPercent: 60 }),
        overflow: 'hidden',
        marginBottom: normDimens.DIMEN_8,
    },
    container5: {
        flexDirection: 'column',
        alignItems: 'center',
        width: normDimens.SCREEN_WIDTH / 2 - normDimens.DIMEN_8,
        borderRadius: normDimens.DIMEN_0,
        paddingBottom: normDimens.DIMEN_8,
    },
});
