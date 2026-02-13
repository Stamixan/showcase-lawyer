import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
    const lang = event.params.lang || 'el';

    const response = await resolve(event, {
        transformPageChunk: ({ html }) => html.replace('<html>', `<html lang="${lang}">`)
    });

    // Security Headers
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set(
        'Content-Security-Policy',
        "default-src 'self'; script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://*.convex.cloud wss://*.convex.cloud https://*.vercel-analytics.com; frame-ancestors 'none';"
    );

    return response;
};
