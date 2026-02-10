# Legal Showcase Demo

A high-performance, modern landing page demo for legal practices, built with **Svelte 5 (Runes)** and **Tailwind CSS v4**. This project serves as a premium template for law firms requiring a fast, professional, and AI-enhanced online presence.

## ⚡ Performance

- **Lighthouse Score:** Optimized for a **100/100** performance score on mobile.
- **LCP:** < 1.2s via prioritized resource loading and non-blocking font strategies.
- **Core Web Vitals:** Zero CLS and minimal TBT.

## 🚀 Key Features

- **Multi-Language (i18n):** Native support for Greek (EL) and English (EN) with URL-based routing.
- **AI-Powered Inquiries:** Automatic contact form analysis and summarization using **Gemini 1.5 Flash**.
- **Modern Tech Stack:** Built with Svelte 5's reactive runes and Tailwind CSS v4's engine.
- **Dynamic Theming:** Centralized theme configuration (Blue, Gold, etc.) affecting colors, fonts, and border radii.
- **Admin Dashboard:** Secure real-time message management via **Convex** backend.
- **Protection:** Admin access secured with exponential lockout mechanisms.
- **SEO Ready:** Auto-generated sitemaps and robots.txt.
- **Cinematic UI:** Smooth, GPU-accelerated background animations and scroll-reveal transitions.

## 🛠 Tech Stack

- **Frontend:** SvelteKit + Svelte 5 (Runes)
- **Styling:** Tailwind CSS v4
- **Backend/Database:** Convex
- **AI Integration:** Google Gemini
- **Email Delivery:** Resend
- **Package Manager:** pnpm / Bun

## 🏃‍♂️ Getting Started

1.  **Install dependencies:**
    ```bash
    pnpm install
    ```

2.  **Start the development server:**
    ```bash
    pnpm run dev
    ```

3.  **Start the backend (Convex):**
    ```bash
    npx convex dev
    ```

## 📝 Configuration & Customization

The entire site's identity is managed through a central data layer:
- **Content & Identity:** Modify `src/lib/data/firms.ts` to update lawyer details, services, and statistics.
- **Theming:** Presets are defined in `src/lib/data/firms.ts`, allowing instant brand shifts.

## 👨‍💻 Developer

Developed by **Ioannis Anthoulis** ([ianthoulis.gr](https://ianthoulis.gr)).

## 📄 License

This is a showcase/demo project. All rights reserved.
