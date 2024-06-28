import { parseProtection } from '../../../utils/AppUtils';
import { PhotoItemContent } from './PhotosContent';

interface SearchPhotosContent {
    total: number;
    total_pages: number;
    results: Array<PhotoItemContent>;
}

const toSearchPhotosContent = (data: any): SearchPhotosContent => {
    return parseProtection(() => {
        return data as SearchPhotosContent;
    });
};

export { type SearchPhotosContent, toSearchPhotosContent };
