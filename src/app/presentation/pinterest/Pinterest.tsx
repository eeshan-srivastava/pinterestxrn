import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import SafeArea from '../widgets/SafeArea';
import colorCode from '../../../resources/colors/colorCode';
import PageStateComponent from '../widgets/pageState/PageStateComponent';
import DefaultErrorView from '../widgets/view/DefaultErrorView';
import DefaultLoadingView from '../widgets/view/DefaultLoadingView';
import { MasonryFlashList } from '@shopify/flash-list';
import { PageStateType } from '../widgets/pageState/PageStateUtils';
import strings from '../../../resources/strings/strings';
import { PaginationStateType } from '../../utils/PaginationUtils';
import { PhotoItemBean, toPhotoItemBean } from '../bean/PhotoBean';
import { PhotosRC } from '../../../domain/model/photos/PhotosRC';
import { photoUseCase } from '../../../domain/usecase';
import { PhotoItemContent } from '../../../domain/model/photos/PhotosContent';
import { getApiErrorMessageFromError } from '../../../utils/AppUtils';
import PhotoItemView from '../media/PhotoItemView';
import normDimens from '../../../resources/dimens/normDimens';
import { ActivityIndicator } from 'react-native-paper';

interface Props {}

interface Route {
    params: {
        source?: string;
    };
}

const Pinterest = (props: Props) => {
    const navigation: any = useNavigation();
    const route = useRoute() as Route;

    const pageSize = 10;
    const [fullPageState, setFullPageState] = useState<PageStateType>(PageStateType.LOADING);
    const [fullPageErrorText, setFullPageErrorText] = useState<string>(strings.something_went_wrong);

    const [photos, setPhotos] = useState<Array<PhotoItemBean>>([]);
    const [pageNo, setPageNo] = useState<number>(1);
    const [paginationState, setPaginationState] = useState<PaginationStateType>(PaginationStateType.LOADING);

    const getPhotosData = async (request: PhotosRC) => {
        photoUseCase
            .getPhotos({ requestContent: request })
            .then((response) => {
                const newData =
                    response?.photos.map((item: PhotoItemContent) => {
                        return toPhotoItemBean(item);
                    }) || [];
                let data = [];
                if (request.page === 1) {
                    data = [...newData];
                } else {
                    data = [...photos, ...newData];
                }
                setPhotos(data);
                if (response.photos.length < pageSize) {
                    setPaginationState(PaginationStateType.FINISHED);
                } else {
                    setPaginationState(PaginationStateType.IDLE);
                }
                setPageNo(request.page + 1);
                setFullPageState(PageStateType.SUCCESS);
            })
            .catch((err) => {
                const message = getApiErrorMessageFromError({ error: err });
                setFullPageErrorText(message);
                if (request.page === 1) {
                    setFullPageState(PageStateType.ERROR);
                }
                setPaginationState(PaginationStateType.FINISHED);
            });
    };

    const init = async () => {
        getPhotosData({
            page: 1,
        });
    };

    useEffect(() => {
        init();
    }, []);

    const onClickItem = (item: PhotoItemBean) => {};

    const renderItem = ({ item, index }: { item: PhotoItemBean; index: number }) => {
        return <PhotoItemView item={item} onClickItem={onClickItem} isFavourite={false} />;
    };

    const footerComponent = () => {
        return (
            <View style={styles.container5}>
                {paginationState === PaginationStateType.LOADING ? (
                    <ActivityIndicator size="large" color={colorCode.primary} style={styles.container2} />
                ) : (
                    <View style={styles.container3} />
                )}
            </View>
        );
    };

    const keyExtractor = (item: PhotoItemBean, index: any) => {
        return item.id.toString();
    };

    const onRetry = () => {
        setFullPageState(PageStateType.LOADING);
        setPaginationState(PaginationStateType.LOADING);
        getPhotosData({
            page: 1,
        });
    };

    const onEndReached = () => {
        if (paginationState !== PaginationStateType.FINISHED) {
            setPaginationState(PaginationStateType.LOADING);
            getPhotosData({
                page: pageNo,
            });
        }
    };

    return (
        <PageStateComponent
            pageState={fullPageState}
            errorComponent={
                <DefaultErrorView
                    secondaryText={fullPageErrorText}
                    onRetry={onRetry}
                    backButtonVisible={false}
                />
            }
            loadingComponent={<DefaultLoadingView message={'Fetching content, please wait...'} />}>
            <View style={styles.container1}>
                <MasonryFlashList
                    data={photos}
                    renderItem={renderItem}
                    numColumns={2}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={keyExtractor}
                    estimatedItemSize={normDimens.DIMEN_260}
                    ListFooterComponent={footerComponent}
                    onEndReachedThreshold={0.5}
                    onEndReached={onEndReached}
                />
            </View>
        </PageStateComponent>
    );
};

export default Pinterest;

const styles = StyleSheet.create({
    container1: {
        backgroundColor: colorCode.black,
        flex: 1,
    },
    container2: {
        marginVertical: normDimens.DIMEN_16,
        width: normDimens.DIMEN_32,
        height: normDimens.DIMEN_32,
    },
    container3: {
        width: normDimens.DIMEN_32,
        height: normDimens.DIMEN_32,
        marginVertical: normDimens.DIMEN_16,
    },
    container5: {
        width: normDimens.SCREEN_WIDTH,
        height: normDimens.DIMEN_80,
        alignItems: 'center',
    },
});
