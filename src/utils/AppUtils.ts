import { refineApiErrorMessage } from '../data/network/ApiUtils';
import ErrorUtils from '../domain/model/pinterestxrn/ErrorUtils';
import { StandardError } from '../domain/model/pinterestxrn/StandardError';
import Environment from './Environment';

const parseProtection = (callback: Function): any => {
    const callbackName: string = callback.name;
    const callerName: string = callback.caller?.name;
    const custom_data: any = {
        function_name: callbackName,
        function_caller_name: callerName,
    };
    try {
        return callback();
    } catch (err) {
        const error: StandardError = {
            error: {
                type: ErrorUtils.ERROR_TYPE.PARSING_ERROR,
            },
            custom_data: custom_data,
            userMessage: ErrorUtils.messages.parsing_error_user_message,
        };
        throw error;
    }
};

const isStandardError = (obj: any): boolean => {
    try {
        if (Object.keys(obj).length >= 2 && Object.keys(obj).length < 5 && obj?.error && obj?.userMessage) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        return false;
    }
};

const logConsoleLog = (message: any, ...optionalParams: any[]): void => {
    if (Environment.IS_STAGING) {
        try {
            console.log(message, ...optionalParams);
        } catch (err) {}
    }
};

const onLogoutFromApp = async (): Promise<string> => {
    return new Promise((resolve, reject) => {});
};

const getApiErrorMessageFromError = (params: { error: any }) => {
    const stdError: StandardError = params.error;
    let errorMessage: string = '';
    if (isStandardError(stdError)) {
        errorMessage = stdError.userMessage;
    } else {
        errorMessage = refineApiErrorMessage(stdError.toString());
    }
    return errorMessage;
};

export { parseProtection, isStandardError, logConsoleLog, onLogoutFromApp, getApiErrorMessageFromError };
