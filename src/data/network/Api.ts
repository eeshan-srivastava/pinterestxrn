import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { logConsoleLog } from '../../utils/AppUtils';
import Environment from '../../utils/Environment';
import AppConstant from '../../utils/AppConstant';

const server_protocol = 'https';
const server_url_prod = 'api.unsplash.com';
const server_url_stage = 'api.unsplash.com';

const api_base_url_prod = server_protocol + '://' + server_url_prod + '/';
const api_base_url_stage = server_protocol + '://' + server_url_stage + '/';

enum apiVersions {
    v1 = 'v1',
    v2 = 'v2',
}

const api_url =
    (Environment.AppEnvironment as any) === Environment.AppEnvironmentType.production
        ? api_base_url_prod
        : api_base_url_stage;

const api_url_v3 = api_url;

const axios_timeout_in_millis = 10000;

const axiosConfigV3: AxiosRequestConfig = {
    baseURL: api_url_v3,
    timeout: axios_timeout_in_millis,
};

const authorized_axios_client_v3 = axios.create(axiosConfigV3);

const authorizedClientRequestHandler = async (request: InternalAxiosRequestConfig) => {
    const req = addCommonHeaders(request);
    logConsoleLog('Api Request => ', req);
    return req;
};

function addCommonHeaders(request: InternalAxiosRequestConfig) {
    request.headers['Authorization'] = AppConstant.AUTH_TOKEN;
    return request;
}

const commonClientResponseHandler = (response: AxiosResponse) => {
    logConsoleLog('Api Response => ');
    return response;
};

const commonRequestErrorHandler = (error: AxiosError) => {
    return Promise.reject(error);
};

const commonResponseErrorHandler = (error: AxiosError) => {
    logConsoleLog('Api Error => ', error);
    return Promise.reject(error);
};

authorized_axios_client_v3.interceptors.request.use(
    async (request: InternalAxiosRequestConfig) => authorizedClientRequestHandler(request),
    (error: AxiosError) => commonRequestErrorHandler(error),
);

authorized_axios_client_v3.interceptors.response.use(
    (response: AxiosResponse) => commonClientResponseHandler(response),
    (error: AxiosError) => commonResponseErrorHandler(error),
);

export default {
    apiVersions,
    authorized_axios_client_v3,
};
