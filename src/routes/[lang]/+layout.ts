import { firmData } from '$lib/data/firms';
import type { LayoutLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: LayoutLoad = ({ params }) => {
    const lang = params.lang as 'el' | 'en';
    const data = firmData[lang];

    if (!data) {
        throw error(404, 'Language not supported');
    }

    return {
        firmData: data,
        lang
    };
};
