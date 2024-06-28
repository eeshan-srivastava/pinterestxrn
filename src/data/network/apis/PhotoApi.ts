import { PhotosRC } from '../../../domain/model/photos/PhotosRC';
import { SearchPhotosRC } from '../../../domain/model/photos/SearchPhotosRC';
import Api from '../Api';
import ApiRoutes from '../ApiRoutes';
import { getRequest } from '../ApiUtils';

const getPhotosApi = async (params: { requestContent: PhotosRC }): Promise<any> => {
    const apiRoute = `${ApiRoutes.photos.photos}?page=${params.requestContent.page}`;
    return new Promise((resolve, reject) => {
        getRequest({
            route: apiRoute,
            axiosClient: Api.authorized_axios_client_v3,
        })
            .then((response) => {
                resolve(response);
            })
            .catch((errorMessage: string) => {
                reject(errorMessage);
            });
    });
};

const searchPhotosApi = async (params: { requestContent: SearchPhotosRC }): Promise<any> => {
    const apiRoute = `${ApiRoutes.photos.searchPhotos}?page=${params.requestContent.page}&query=${params.requestContent.query}`;
    return new Promise((resolve, reject) => {
        getRequest({
            route: apiRoute,
            axiosClient: Api.authorized_axios_client_v3,
        })
            .then((response) => {
                resolve(response);
            })
            .catch((errorMessage: string) => {
                reject(errorMessage);
            });
    });
};

export default {
    getPhotosApi,
    searchPhotosApi,
};
