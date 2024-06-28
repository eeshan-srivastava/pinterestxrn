import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
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
import EditText from '../widgets/textInput/EditText';
import normFonts from '../../../resources/dimens/normFonts';
import TextView from '../widgets/textView/TextView';
import { SearchPhotosRC } from '../../../domain/model/photos/SearchPhotosRC';

interface Props {}

interface Route {
    params: {
        source?: string;
    };
}

const Search = (props: Props) => {
    const navigation: any = useNavigation();
    const route = useRoute() as Route;

    const pageSize = 10;
    const [searchText, setSearchText] = useState<string>('');
    const [fullPageState, setFullPageState] = useState<PageStateType>(PageStateType.SUCCESS);
    const [fullPageErrorText, setFullPageErrorText] = useState<string>(strings.something_went_wrong);

    const [photos, setPhotos] = useState<Array<PhotoItemBean>>([]);
    const [pageNo, setPageNo] = useState<number>(1);
    const [paginationState, setPaginationState] = useState<PaginationStateType>(PaginationStateType.IDLE);

    const searchPhotosData = async (request: SearchPhotosRC) => {
        photoUseCase
            .searchPhotos({ requestContent: request })
            .then((response) => {
                const newData =
                    response?.results.map((item: PhotoItemContent) => {
                        return toPhotoItemBean(item);
                    }) || [];
                let data = [];
                if (request.page === 1) {
                    data = [...newData];
                } else {
                    data = [...photos, ...newData];
                }
                setPhotos(data);
                if (response.total_pages === pageNo) {
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
        if(searchText.trim()!==''){
            setFullPageState(PageStateType.LOADING);
            setPaginationState(PaginationStateType.IDLE);
            searchPhotosData({
                page: 1,
                query: searchText
            });
        }else{
            setFullPageState(PageStateType.SUCCESS);
            setPaginationState(PaginationStateType.IDLE);
            setPhotos([])
        }
    };

    const onEndReached = () => {
        if (paginationState !== PaginationStateType.FINISHED && searchText.trim()!=='') {
            setPaginationState(PaginationStateType.LOADING);
            searchPhotosData({
                page: pageNo,
                query: searchText
            });
        }
    };

    const onChangeText = (text: string) => {
        if(text.trim()!==''){
            setSearchText(text.trim());
        }else{
            setSearchText('')
            setPhotos([])
            setFullPageState(PageStateType.SUCCESS)
        }
    };


    const onClickSearch = () =>{
        if(searchText.trim()!==''){
            setFullPageState(PageStateType.LOADING)
            searchPhotosData({
                page: 1,
                query: searchText
            });
        }
    }

    return (
        <View style={styles.container6}>
            <View style={styles.container7}>
                <View style={styles.container9}>
                    <EditText
                        textStyle={{
                            fontSize: normFonts.FONT_16,
                            backgroundColor: colorCode.transparent,
                            flex: 1,
                        }}
                        placeholder={'Search Photos...'}
                        onTextChanged={onChangeText}
                        maxLength={100}
                        cursorColor={colorCode.white}
                        textColor={colorCode.blue}
                    />
                    <TouchableOpacity style={styles.container8} onPress={onClickSearch} activeOpacity={0.7}>
                        <View pointerEvents='none'>
                            <TextView style={styles.text1}>{'Search'}</TextView>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
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
        </View>
    );
};

export default Search;

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
    container6: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colorCode.black,
    },
    container7: {
        flexDirection: 'row',
        width: '100%',
        height: normDimens.DIMEN_56,
    },
    container8:{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        borderRadius: normDimens.DIMEN_40,
        height: normDimens.DIMEN_36,
        width: normDimens.DIMEN_80,
        backgroundColor: colorCode.blue,
        alignSelf:'center',
        marginEnd: normDimens.DIMEN_8
    },
    text1:{
        color: colorCode.white
    },
    container9: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: colorCode.black,
    },
});
