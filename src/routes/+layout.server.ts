import type { LayoutServerLoad } from './$types';
import { defaultTheme } from '$lib/data/firms';

export const load: LayoutServerLoad = async () => {
    return {
        theme: defaultTheme
    };
};
