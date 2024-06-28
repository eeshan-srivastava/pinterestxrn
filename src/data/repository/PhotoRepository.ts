import { PhotosContent, toPhotosContent } from '../../domain/model/photos/PhotosContent';
import { PhotosRC } from '../../domain/model/photos/PhotosRC';
import { SearchPhotosContent, toSearchPhotosContent } from '../../domain/model/photos/SearchPhotosContent';
import { SearchPhotosRC } from '../../domain/model/photos/SearchPhotosRC';
import { photoApi } from '../network/apis';

const getPhotosApiCall = async (params: { requestContent: PhotosRC }): Promise<PhotosContent> => {
    return new Promise((resolve, reject) => {
        photoApi
            .getPhotosApi(params)
            .then((response) => {
                resolve(toPhotosContent(response));
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const searchPhotosApiCall = async (params: {
    requestContent: SearchPhotosRC;
}): Promise<SearchPhotosContent> => {
    return new Promise((resolve, reject) => {
        photoApi
            .searchPhotosApi(params)
            .then((response) => {
                resolve(toSearchPhotosContent(response));
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default {
    getPhotosApiCall,
    searchPhotosApiCall,
};
