
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { convexClient } from '$lib/server/convex';
import { api } from '$convex/_generated/api';

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
    try {
        const body = await request.json();
        const ip = getClientAddress();

        // Call the Convex Action with the IP address for rate limiting
        await convexClient.action(api.emails.submitInquiry, {
            ...body,
            ip
        });

        return json({ success: true });
    } catch (error: any) {
        console.error('Submission error:', error);
        // Convex errors usually have a message property
        const message = error.message || 'Submission failed';

        // Return 400 for validation errors or rate limits
        return json({ error: message }, { status: 400 });
    }
};
