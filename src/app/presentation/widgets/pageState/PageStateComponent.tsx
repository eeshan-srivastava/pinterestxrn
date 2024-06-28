import React from 'react';
import { StyleSheet, Text, ViewStyle } from 'react-native';
import { PageStateType } from './PageStateUtils';
import { View } from 'react-native';
import normDimens from '../../../../resources/dimens/normDimens';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import normFonts from '../../../../resources/dimens/normFonts';

interface PageStateComponentProps {
    style?: ViewStyle;
    pageState: PageStateType;
    loadingComponent?: React.ReactNode;
    children: React.ReactNode;
    errorComponent?: React.ReactNode;
    loadingText?: string;
    loadingStyle?: ViewStyle;
}

const PageStateComponent = (props: PageStateComponentProps) => {
    const { style, pageState, loadingComponent, children, errorComponent, loadingText, loadingStyle } = props;
    return (
        <View style={[styles.root, style]}>
            {pageState === PageStateType.LOADING &&
                (loadingComponent ? (
                    loadingComponent
                ) : (
                    <LoadingComponent loadingText={loadingText} loadingStyle={loadingStyle} />
                ))}
            {pageState === PageStateType.ERROR && errorComponent}
            {pageState === PageStateType.SUCCESS && children}
        </View>
    );
};

interface LoadingComponentProps {
    loadingText?: string;
    loadingStyle?: ViewStyle;
}

export const LoadingComponent = (props: LoadingComponentProps) => {
    const { loadingText = 'Loading . . .', loadingStyle = {} } = props;
    return (
        <View style={[styles.loadingRoot, loadingStyle]}>
            <Text style={styles.loadingText}>{loadingText}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    loadingRoot: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingGif: {
        width: normDimens.DIMEN_160,
        height: normDimens.DIMEN_160,
    },
    loadingText: {
        color: Colors.WHITE,
        fontSize: normFonts.FONT_14,
    },
});

export default PageStateComponent;
