import { photoRepository } from '../../data/repository';
import { PhotosContent } from '../model/photos/PhotosContent';
import { PhotosRC } from '../model/photos/PhotosRC';
import { SearchPhotosContent } from '../model/photos/SearchPhotosContent';
import { SearchPhotosRC } from '../model/photos/SearchPhotosRC';

const getPhotos = async (params: { requestContent: PhotosRC }): Promise<PhotosContent> => {
    return new Promise((resolve, reject) => {
        photoRepository
            .getPhotosApiCall(params)
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

const searchPhotos = async (params: { requestContent: SearchPhotosRC }): Promise<SearchPhotosContent> => {
    return new Promise((resolve, reject) => {
        photoRepository
            .searchPhotosApiCall(params)
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default {
    getPhotos,
    searchPhotos,
};
