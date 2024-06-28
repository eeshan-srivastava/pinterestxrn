import { parseProtection } from '../../../utils/AppUtils';

interface AlternativeSlugsBean {
    en: string;
    es: string;
    ja: string;
    fr: string;
    it: string;
    ko: string;
    de: string;
    pt: string;
}

interface BreadcrumbBean {
    slug: string;
    title: string;
    index: number;
    type: string;
}

interface LinksBean {
    self: string;
    html: string;
    download: string;
    download_location: string;
}

interface ProfileImageBean {
    small: string;
    medium: string;
    large: string;
}

interface SocialBean {
    instagram_username: string;
    portfolio_url: string | null;
    twitter_username: string | null;
    paypal_email: string | null;
}

interface UserBean {
    id: string;
    updated_at: string;
    username: string;
    name: string;
    first_name: string;
    last_name: string | null;
    twitter_username: string | null;
    portfolio_url: string | null;
    bio: string;
    location: string;
    links: LinksBean;
    profile_image: ProfileImageBean;
    instagram_username: string;
    total_collections: number;
    total_likes: number;
    total_photos: number;
    total_promoted_photos: number;
    accepted_tos: boolean;
    for_hire: boolean;
    social: SocialBean;
}

interface TagsBean {
    type: string;
    title: string;
}

interface TopicSubmissionsBean {
    [key: string]: {
        status: string;
        approved_on: string;
    };
}

interface SponsorBean {
    id: string;
    updated_at: string;
    username: string;
    name: string;
    first_name: string;
    last_name: string | null;
    twitter_username: string | null;
    portfolio_url: string | null;
    bio: string;
    location: string;
    links: LinksBean;
    profile_image: ProfileImageBean;
    instagram_username: string;
    total_collections: number;
    total_likes: number;
    total_photos: number;
    total_promoted_photos: number;
    accepted_tos: boolean;
    for_hire: boolean;
    social: SocialBean;
}

interface SponsorshipBean {
    impression_urls: string[];
    tagline: string;
    tagline_url: string;
    sponsor: SponsorBean;
}

interface PhotoItemBean {
    id: string;
    slug: string;
    alternative_slugs: AlternativeSlugsBean;
    created_at: string;
    updated_at: string;
    promoted_at: string | null;
    width: number;
    height: number;
    color: string;
    blur_hash: string;
    description: string;
    alt_description: string;
    breadcrumbs: BreadcrumbBean[];
    urls: {
        raw: string;
        full: string;
        regular: string;
        small: string;
        thumb: string;
        small_s3: string;
    };
    links: LinksBean;
    likes: number;
    liked_by_user: boolean;
    current_user_collections: any[];
    sponsorship: SponsorshipBean | null;
    topic_submissions: TopicSubmissionsBean;
    asset_type: string;
    user: UserBean;
    tags: TagsBean[];
}

const toPhotoItemBean = (data: any): PhotoItemBean => {
    return parseProtection(() => {
        return data as PhotoItemBean;
    });
};

export { type PhotoItemBean, toPhotoItemBean };
