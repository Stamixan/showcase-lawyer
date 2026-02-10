import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const lang = event.params.lang || 'el';

    return resolve(event, {
        transformPageChunk: ({ html }) => html.replace('<html>', `<html lang="${lang}">`)
    });
};
