import type { FirmConfig, ThemeConfig } from '$lib/types/firm';
import themes from './themes.json';
import common from './firm/common.json';

// EL
import elLawyer from './firm/el/lawyer.json';
import elServices from './firm/el/services.json';
import elTestimonials from './firm/el/testimonials.json';
import elContact from './firm/el/contact.json';

// EN
import enLawyer from './firm/en/lawyer.json';
import enServices from './firm/en/services.json';
import enTestimonials from './firm/en/testimonials.json';
import enContact from './firm/en/contact.json';

export const themePresets = themes as Record<string, ThemeConfig>;
export const defaultTheme = themePresets.blue;

export const firmInfo: Record<string, FirmConfig> = {
    el: {
        lawyer: elLawyer,
        contact: {
            ...common.contact,
            address: {
                ...common.contact.address,
                ...elContact.address
            },
            hours: elContact.hours
        },
        stats: common.stats,
        services: elServices,
        testimonials: elTestimonials
    },
    en: {
        lawyer: enLawyer,
        contact: {
            ...common.contact,
            address: {
                ...common.contact.address,
                ...enContact.address
            },
            hours: enContact.hours
        },
        stats: common.stats,
        services: enServices,
        testimonials: enTestimonials
    }
} as Record<string, FirmConfig>;
