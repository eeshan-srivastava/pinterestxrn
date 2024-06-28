import { current } from '@reduxjs/toolkit';
import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import normDimens from '../../../../../resources/dimens/normDimens';
import { BottomNavTabData, BottomTabActionType } from '../BottomNavUtils';
import BottomNavTab from './ReactBottomNavItem';
import ReactBottomNavItem from './ReactBottomNavItem';
import colorCode from '../../../../../resources/colors/colorCode';
import ColorUtils from '../../../../../resources/colors/ColorUtils';

interface Props {
    selectedTab: string;
    onTabChange: (tabId: string, action: BottomTabActionType) => void;
    tabs: Array<BottomNavTabData>;
    width?: number;
    height?: number;
    style?: ViewStyle;
    state: any;
    descriptors: any;
    navigation: any;
}

const ReactBottomNavBar = (props: Props) => {
    const {
        selectedTab,
        tabs = [],
        onTabChange,
        style,
        width = normDimens.SCREEN_WIDTH,
        height = normDimens.DIMEN_60,
        state,
        descriptors,
        navigation,
    } = props;

    const totalTabs = tabs?.length || 1;
    const tabWidth = width / totalTabs;

    const onTabSelected = (params: { route: any; item: BottomNavTabData; isSelected: boolean }) => {
        const { route, item, isSelected } = params;
        onTabChange(item?.id, BottomTabActionType.TAB_SELECTED);

        const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
        });

        if (!isSelected && !event.defaultPrevented) {
            navigation.navigate(route.name);
        }
    };

    const renderTabs = (route: any, index: number) => {
        const { options } = descriptors[route.key];
        const reactlabel =
            options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

        const isSelected = state.index === index;
        const item = tabs?.[index];
        const { id, label, icon, activeIcon, inActiveIcon, activeTint, inactiveTint, customImage } = item;

        return (
            <ReactBottomNavItem
                key={id}
                label={label}
                icon={icon}
                tint={isSelected ? activeTint : inactiveTint}
                showGradient={isSelected ? true : false}
                customImage={customImage}
                height={height}
                onClick={() => onTabSelected({ route, item, isSelected })}
                width={tabWidth}
            />
        );
    };

    return (
        <View style={[style, { width: width, height: height }]}>
            {/* <BlurView
                style={[styles.container2, { width: width, height: height }]}
                blurType="dark"
                blurAmount={15}
                blurRadius={10}
                overlayColor={colorCode.transparent}
                reducedTransparencyFallbackColor="black"
            /> */}
            <View style={[styles.container1, { width: width, height: height }]}>
                {state.routes.map(renderTabs)}
            </View>
        </View>
    );
    return <View style={{ height: normDimens.DIMEN_60, backgroundColor: 'orange' }}></View>;
};

export default ReactBottomNavBar;

const styles = StyleSheet.create({
    container1: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: ColorUtils.getAlphaColor({colorCode: colorCode.black, opacityPercent:92}),
    },
    container2: {
        position: 'absolute',
    },
});
