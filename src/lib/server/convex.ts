import { ConvexHttpClient } from "convex/browser";
import { PUBLIC_CONVEX_URL } from "$env/static/public";

// Use ConvexHttpClient for server-side requests (stateless, HTTP-based)
export const convexClient = new ConvexHttpClient(PUBLIC_CONVEX_URL);
