export const translations = {
    el: {
        nav: {
            home: 'Αρχική',
            about: 'Σχετικά',
            services: 'Τομείς Δικαίου',
            testimonials: 'Μαρτυρίες',
            contact: 'Επικοινωνία'
        },
        footer: {
            links: 'Σύνδεσμοι',
            legal: 'Νομικά',
            privacy: 'Πολιτική Απορρήτου',
            terms: 'Όροι Χρήσης',
            disclaimer: 'Αποποίηση Ευθύνης',
            rights: 'Με επιφύλαξη παντός δικαιώματος.',
            created_by: 'Δημιουργία:',
            developer_name: 'Ιωάννης Ανθούλης',
            follow_us: 'Ακολουθήστε μας',
            tagline: 'Παρέχοντας υψηλής ποιότητας νομικές υπηρεσίες με ακεραιότητα και επαγγελματισμό.'
        },
        services: {
            title: 'Τομείς Δικαίου',
            view_all: 'Δείτε όλες τις υπηρεσίες',
            description: 'Εξειδικευμένες νομικές υπηρεσίες προσαρμοσμένες στις ανάγκες σας.'
        },
        testimonials: {
            title: 'Τι λένε οι πελάτες μας',
            subtitle: 'Μαρτυρίες'
        },
        about: {
            title: 'Σχετικά με εμάς'
        },
        contact: {
            title: 'Επικοινωνία',
            description: 'Είμαστε εδώ για να σας βοηθήσουμε. Καλέστε μας ή στείλτε μήνυμα.'
        },
        cookies: {
            text: 'Δεν χρησιμοποιούμε cookies παρακολούθησης. Ενδέχεται να χρησιμοποιούνται cookies από τρίτες υπηρεσίες (Google Maps).',
            accept: 'Αποδοχή',
            decline: 'Απόρριψη'
        },
        meta: {
            locale: 'el_GR'
        },
        common: {
            back_to_home: 'Επιστροφή στην Αρχική'
        }
    },
    en: {
        nav: {
            home: 'Home',
            about: 'About',
            services: 'Practice Areas',
            testimonials: 'Testimonials',
            contact: 'Contact'
        },
        footer: {
            links: 'Quick Links',
            legal: 'Legal',
            privacy: 'Privacy Policy',
            terms: 'Terms of Use',
            disclaimer: 'Disclaimer',
            rights: 'All rights reserved.',
            created_by: 'Created by',
            developer_name: 'Ioannis Anthoulis',
            follow_us: 'Follow Us',
            tagline: 'Providing high-quality legal services with integrity and professionalism.'
        },
        services: {
            title: 'Practice Areas',
            view_all: 'View All Services',
            description: 'Specialized legal services tailored to your needs.'
        },
        testimonials: {
            title: 'What our clients say',
            subtitle: 'Testimonials'
        },
        about: {
            title: 'About Us'
        },
        contact: {
            title: 'Contact Me',
            description: 'We are here to help. Call us or send a message.'
        },
        cookies: {
            text: 'We do not use tracking cookies. Cookies may be used by third-party services (Google Maps).',
            accept: 'Accept',
            decline: 'Decline'
        },
        meta: {
            locale: 'en_US'
        },
        common: {
            back_to_home: 'Back to Home'
        }
    }
} as const;

export type TranslationKey = keyof typeof translations.el;
