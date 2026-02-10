export interface LawyerConfig {
    firstName: string;
    lastName: string;
    fullName: string;
    title: string;
    shortBio: string;
    aboutText: string; // HTML content
    profileImage: string;
}

export interface ContactConfig {
    phone: string;
    email: string;
    address: {
        street: string;
        number: string;
        city: string;
        postalCode: string;
        mapUrl: string; // Link to Google Maps
        mapEmbedUrl: string; // Embed iframe src
    };
    hours: {
        weekdays: string;
        weekend: string;
    };
    socials?: {
        facebook?: string;
        instagram?: string;
        linkedin?: string;
        twitter?: string;
    };
}

export interface StatsConfig {
    yearsExperience: string;
    casesWon: string;
    successRate: string;
    happyClients: string;
    labels: {
        years: string;
        cases: string;
        rate: string;
        clients: string;
    };
}

export interface ServiceConfig {
    title: string;
    description: string;
    iconPath: string; // SVG path d attribute
}

export interface TestimonialConfig {
    quote: string;
    author: string;
    role: string;
    initials: string;
}

export interface FirmConfig {
    // slug: string; // Removed for single-tenant
    lawyer: LawyerConfig;
    contact: ContactConfig;
    stats: StatsConfig;
    services: ServiceConfig[];
    testimonials: TestimonialConfig[];
    ui: {
        aboutMe: string;
        aboutTitle: string;
        excellence: string;
        memberBar: string;
        appealCourt: string;
        fluentEnglish: string;
        modernApproach: string;
        bookAppointment: string;
        learnMore: string;
        contactSection: string;
        contactTitle: string;
        contactDesc: string;
        addressLabel: string;
        phoneLabel: string;
        emailLabel: string;
        hoursLabel: string;
        formName: string;
        formLastName: string;
        formEmail: string;
        formPhone: string;
        formTopic: string;
        formMessage: string;
        formMessagePlaceholder: string;
        formPrivacy: string;
        formPrivacyLink: string;
        formPrivacyConsent: string;
        formSubmit: string;
        formSubmitting: string;
        formSuccess: string;
        formSuccessDesc: string;
        formError: string;
        formErrorDesc: string;
        selectTopic: string;
        formPrivacyValidation: string;
        markdownHint: string;
        markdownGuideLink: string;

    };
    meta: {
        title: string;
        description?: string;
    };
}

export interface ThemeConfig {
    colors: {
        primary: string;    // Brand color (e.g., Gold/Amber)
        secondary: string;  // Dark background (e.g., Slate 900)
        accent: string;     // Highlight/Hover (e.g., Amber 600)
        text: string;       // Body text (e.g., Slate 600)
        heading: string;    // Headings (e.g., Slate 900)
        background: string; // Light background (e.g., White)
    };
    fonts: {
        heading: string; // Google Font Name
        body: string;    // Google Font Name
    };
    borderRadius: string; // '0px', '4px', '8px', '2rem'
}
