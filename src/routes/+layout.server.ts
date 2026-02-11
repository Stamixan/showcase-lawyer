import type { LayoutServerLoad } from './$types';
import { defaultTheme } from '$lib/data/firm';

export const load: LayoutServerLoad = async () => {
    return {
        theme: defaultTheme
    };
};
