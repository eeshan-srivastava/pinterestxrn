import { parseProtection } from '../../../utils/AppUtils';

interface AlternativeSlugsContent {
    en: string;
    es: string;
    ja: string;
    fr: string;
    it: string;
    ko: string;
    de: string;
    pt: string;
}

interface BreadcrumbContent {
    slug: string;
    title: string;
    index: number;
    type: string;
}

interface LinksContent {
    self: string;
    html: string;
    download: string;
    download_location: string;
}

interface ProfileImageContent {
    small: string;
    medium: string;
    large: string;
}

interface SocialContent {
    instagram_username: string;
    portfolio_url: string | null;
    twitter_username: string | null;
    paypal_email: string | null;
}

interface UserContent {
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
    links: LinksContent;
    profile_image: ProfileImageContent;
    instagram_username: string;
    total_collections: number;
    total_likes: number;
    total_photos: number;
    total_promoted_photos: number;
    accepted_tos: boolean;
    for_hire: boolean;
    social: SocialContent;
}

interface TagsContent {
    type: string;
    title: string;
}

interface TopicSubmissionsContent {
    [key: string]: {
        status: string;
        approved_on: string;
    };
}

interface SponsorContent {
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
    links: LinksContent;
    profile_image: ProfileImageContent;
    instagram_username: string;
    total_collections: number;
    total_likes: number;
    total_photos: number;
    total_promoted_photos: number;
    accepted_tos: boolean;
    for_hire: boolean;
    social: SocialContent;
}

interface SponsorshipContent {
    impression_urls: string[];
    tagline: string;
    tagline_url: string;
    sponsor: SponsorContent;
}

interface PhotoItemContent {
    id: string;
    slug: string;
    alternative_slugs: AlternativeSlugsContent;
    created_at: string;
    updated_at: string;
    promoted_at: string | null;
    width: number;
    height: number;
    color: string;
    blur_hash: string;
    description: string;
    alt_description: string;
    breadcrumbs: BreadcrumbContent[];
    urls: {
        raw: string;
        full: string;
        regular: string;
        small: string;
        thumb: string;
        small_s3: string;
    };
    links: LinksContent;
    likes: number;
    liked_by_user: boolean;
    current_user_collections: any[];
    sponsorship: SponsorshipContent | null;
    topic_submissions: TopicSubmissionsContent;
    asset_type: string;
    user: UserContent;
    tags: TagsContent[];
}

interface PhotosContent {
    photos: Array<PhotoItemContent>;
}

const toPhotosContent = (data: any): PhotosContent => {
    return parseProtection(() => {
        return {
            photos: data,
        };
    });
};

export { type PhotoItemContent, type PhotosContent, toPhotosContent };
