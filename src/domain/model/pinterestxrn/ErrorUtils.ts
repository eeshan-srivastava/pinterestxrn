enum ERROR_TYPE {
    CRITICAL_ERROR = 'CRITICAL_ERROR',
    NON_CRITICAL_ERROR = 'NON_CRITICAL_ERROR',
    API_ERROR = 'API_ERROR',
    PARSING_ERROR = 'PARSING_ERROR',
}

const messages = {
    parsing_error_user_message: '[PE]: Unexpected error !',
    unexpected_error: 'Unexpected error!',
};

export default { ERROR_TYPE, messages };
