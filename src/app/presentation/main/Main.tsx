import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';
import SafeArea from '../widgets/SafeArea';
import colorCode from '../../../resources/colors/colorCode';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    BottomNavTabData,
    BottomTabActionType,
    MainTabs,
} from '../widgets/bottomNavigationBar/BottomNavUtils';
import imageFile from '../../../resources/images/imageFile';
import ReactBottomNavBar from '../widgets/bottomNavigationBar/reactNavigation/ReactBottomNavBar';
import normDimens from '../../../resources/dimens/normDimens';
import NavigationRoutes from '../../navigation/NavigationRoutes';
import BackPressUtils from '../../../utils/BackPressUtils';
import Pinterest from '../pinterest/Pinterest';
import Search from '../search/Search';
import ColorUtils from '../../../resources/colors/ColorUtils';

interface Props {}

interface Route {
    params: {
        source?: string;
    };
}

const ReactNavTab = createBottomTabNavigator();

const Main = (props: Props) => {
    const navigation: any = useNavigation();
    const route = useRoute() as Route;
    const defaultTab = MainTabs.Pinterest;
    const [selectedTab, setSelectedTab] = useState<string>(defaultTab);
    const activeTabs: any = useRef({ [selectedTab]: true });

    const onTabChange = (tabId: string, action: BottomTabActionType) => {
        if (tabId !== selectedTab) {
            activeTabs.current[tabId] = true;
            setSelectedTab(tabId);
        }
    };

    useEffect(() => {}, []);

    const onBackPress = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        }
        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener(BackPressUtils.HARDWARE_BACKPRESS, onBackPress);
        return () => BackHandler.removeEventListener(BackPressUtils.HARDWARE_BACKPRESS, onBackPress);
    }, []);

    const onBackPresssed = () => {
        onBackPress();
    };

    const tabs: Array<BottomNavTabData> = [
        {
            id: MainTabs.Pinterest,
            label: MainTabs.Pinterest,
            icon: imageFile.IC_PINTEREST,
            activeTint: colorCode.primary,
            inactiveTint: ColorUtils.getAlphaColor({colorCode: colorCode.white, opacityPercent:70})
        },
        {
            id: MainTabs.Search,
            label: MainTabs.Search,
            icon: imageFile.IC_SEARCH,
            activeTint: colorCode.primary,
            inactiveTint: ColorUtils.getAlphaColor({colorCode: colorCode.white, opacityPercent:70})
        },
    ];

    const tabBar = (props: any) => {
        return (
            <ReactBottomNavBar
                onTabChange={onTabChange}
                selectedTab={selectedTab}
                tabs={tabs}
                height={normDimens.DIMEN_60}
                state={props.state}
                descriptors={props.descriptors}
                navigation={props.navigation}
            />
        );
    };

    return (
        <SafeArea>
            <ReactNavTab.Navigator tabBar={tabBar}>
                <ReactNavTab.Screen
                    name={NavigationRoutes.pinterest}
                    component={Pinterest}
                    options={{ headerShown: false }}
                />
                <ReactNavTab.Screen
                    name={NavigationRoutes.search}
                    component={Search}
                    options={{ headerShown: false }}
                />
            </ReactNavTab.Navigator>
        </SafeArea>
    );
};

export default Main;

const styles = StyleSheet.create({
    container1: {
        backgroundColor: colorCode.black,
        flex: 1,
    },
});
