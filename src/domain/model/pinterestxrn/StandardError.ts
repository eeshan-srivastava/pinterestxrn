interface StandardError {
    error: {
        type: string;
        component?: string;
        apiRoute?: string;
    };
    userMessage: string;
    developerMessage?: string;
    custom_data?: any;
}

export { type StandardError };
