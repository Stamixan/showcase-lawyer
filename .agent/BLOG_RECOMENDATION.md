### **Prompt / Blueprint for AI Assistant**

**Context:**
We are building a Blog/Insights section for a SvelteKit + Convex lawyer website.
We already have `Markdown.svelte` for rendering and `MarkdownToolbar.svelte` for editing.

**Goal:**
Implement a fully functional blog with a public view and a secure admin editor.

---

#### **Step 1: Database Schema (`convex/schema.ts`)**

Modify the schema to add a `posts` table.

- **Table Name:** `posts`
- **Fields:**
- `title` (string): The headline.
- `slug` (string): URL-friendly identifier (e.g., "my-first-post").
- `excerpt` (string): Short summary for the card view.
- `body` (string): The full markdown content.
- `coverImage` (string, optional): ID or URL for the header image.
- `published` (boolean): Draft vs. Public status.
- `publishedAt` (number, optional): Timestamp for sorting.

- **Indexes:**
- `by_slug`: Unique index on `slug` for fast lookups.
- `by_published`: Composite index on `["published", "publishedAt"]` for the main feed.

#### **Step 2: Backend Logic (`convex/posts.ts`)**

Create a new file `convex/posts.ts` with the following functions:

1. **`list` (Query):**

- Returns the 20 most recent _published_ posts.
- Returns only metadata (title, slug, excerpt, date) to save bandwidth.

2. **`getBySlug` (Query):**

- Args: `{ slug: string }`.
- Returns the full post object (including `body`).

3. **`save` (Mutation):**

- Args: `{ id? , title, slug, excerpt, body, published, password }`.
- **Security:** Check `args.password === process.env.ADMIN_PASSWORD` (same pattern as `convex/inquiries.ts`).
- Logic: If `id` is provided, `patch` (update). If not, `insert` (create).

4. **`adminList` (Query):**

- Args: `{ password: string }`.
- Returns **all** posts (drafts and published) for the admin dashboard.

#### **Step 3: Frontend - Public Routes**

Create the following SvelteKit routes under `src/routes/[lang]/blog`:

**A. Blog Index (`src/routes/[lang]/blog/+page.svelte`)**

- **Data:** Fetch `api.posts.list` using `useQuery`.
- **UI:** Display a grid of "Post Cards".
- Each card shows: Title, Excerpt, Date.
- Link: `/[lang]/blog/{post.slug}`.

**B. Single Post (`src/routes/[lang]/blog/[slug]/+page.svelte`)**

- **Data:** Fetch `api.posts.getBySlug` with the `slug` from the URL.
- **UI:**
- Hero section with `title` and `date`.
- Content section using the existing `<Markdown />` component to render `post.body`.
- "Back to Blog" button.

- **SEO:** dynamically update `<title>` and `<meta name="description">`.

#### **Step 4: Frontend - Admin Editor**

Create a _hidden_ route (e.g., `src/routes/admin/editor/+page.svelte`) or reuse the structure you have.

- **State:** `formData` object matching the schema.
- **UI:**
- Inputs for Title, Slug, Excerpt.
- **Editor:** A `<textarea>` enhanced with your existing `<MarkdownToolbar />`.
- **Preview:** A "Live Preview" tab that renders the current `body` using `<Markdown />`.
- **Save Button:** Calls the `save` mutation.

---

### **Implementation Tips for the Agent**

- **Reuse Components:** Do not create a new Markdown renderer. Import `Markdown` from `$lib/components/Markdown.svelte`.
- **Type Safety:** Use the `Doc<"posts">` type from `convex/_generated/dataModel` when possible.
- **Routing:** Ensure the `[lang]` parameter is respected so the blog works in both English and Greek (even if content is mixed for now).
