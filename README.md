# Law Firm Platform

A modern landing page for law firms, built with SvelteKit, Tailwind CSS, Convex, and Gemini AI.

## 🚀 Features

- **Single-Tenant Architecture:** Tailored for a specific law firm (Georgios Papadopoulos).
- **Multi-Language Support:** Fully translated in Greek (EL) and English (EN).
- **Data-Driven UI:** Components are fully dynamic, controlled by a central configuration.
- **Intellectual Property Focus:** Specialized content for IP, Patent Law, and Digital Law.
- **Admin Dashboard:** Secure `/admin` route to manage contact form inquiries in real-time.
- **AI-Powered:** Automatic message summarization using Gemini 3 Flash.
- **Secure:** Admin panel protected by a password wall with exponential backoff lockout.
- **Email Notifications:** Instant notifications via Resend.
- **Compliance:** Built-in Privacy Policy, Terms of Use, and Disclaimer pages.
- **Visual Consistency:** Global theme variables for consistent rounding and spacing.
- **Enhanced UI:** High-contrast sections (Testimonials, Services) and cinematic hero animations.

## 🛠 Tech Stack

- **Framework:** SvelteKit + Svelte 5 (Runes)
- **Styling:** Tailwind CSS v4
- **Backend:** Convex
- **AI:** Google Gemini 3 Flash
- **Email:** Resend
- **Runtime:** Bun

## 🏃‍♂️ Getting Started

1.  **Install dependencies:**

    ```bash
    bun install
    ```

2.  **Start the development server:**

    ```bash
    bun run dev
    ```

3.  **Start the backend (Convex):**
    ```bash
    bunx convex dev
    ```

## 📝 Configuration

To update the firm's information or content:

1.  Open `src/lib/data/firms.ts`.
2.  Modify the `firmData` object for `el` and `en` locales.
3.  Update lawyer details, contact info, statistics, services, and UI labels.
4.  Changes will be reflected across the site immediately.

## 📁 Project Structure

- `src/routes/[lang]`: Localized routes for the landing page.
- `src/lib/data/firms.ts`: Central configuration file (The "Brain" of the site).
- `src/lib/components`: Reusable, props-driven UI components.
- `convex/`: Backend functions, schema, and AI integration.

## 📄 License

Private / Proprietary
