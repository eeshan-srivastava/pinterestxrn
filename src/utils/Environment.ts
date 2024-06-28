enum AppEnvironmentType {
    production = 'production',
    staging = 'staging',
}

const AppEnvironment: AppEnvironmentType = AppEnvironmentType.production;

const isProduction = (): boolean => {
    return !__DEV__ && AppEnvironment === (AppEnvironmentType.production as any);
};

const isStaging = (): boolean => {
    return __DEV__ && AppEnvironment === (AppEnvironmentType.staging as any);
};

const IS_PRODUCTION: boolean = isProduction();
const IS_STAGING: boolean = isStaging();

export default {
    AppEnvironmentType,
    AppEnvironment,
    IS_PRODUCTION,
    IS_STAGING,
};
