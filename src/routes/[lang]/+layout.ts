import { firmData } from '$lib/data/firms';
import { translations } from '$lib/data/translations';
import type { LayoutLoad } from './$types';
import { error } from '@sveltejs/kit';

export const prerender = true;

export const load: LayoutLoad = ({ params }) => {
    const lang = params.lang as 'el' | 'en';
    const data = firmData[lang];
    const t = translations[lang];

    if (!data || !t) {
        throw error(404, 'Language not supported');
    }

    return {
        firmData: data,
        lang,
        t
    };
};
