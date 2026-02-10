import type { FirmConfig, ThemeConfig } from '$lib/types/firm';

export const themePresets: Record<string, ThemeConfig> = {
    blue: {
        colors: {
            primary: "#2563eb",      // Electric Blue
            secondary: "#000000",    // Pure Black
            accent: "#60a5fa",       // Light Blue
            text: "#374151",         // Gray 700
            heading: "#111827",      // Gray 900
            background: "#f3f4f6"    // Light Gray (off-white)
        },
        fonts: {
            heading: "Outfit:wght@400;700", // Modern Sans
            body: "DM+Sans:wght@400;500"    // Tech Sans
        },
        borderRadius: "0.75rem" // Modern Standard
    },
    gold: {
        colors: {
            primary: "#b8860b",      // Gold
            secondary: "#0f172a",    // Slate 900
            accent: "#d97706",       // Amber 600
            text: "#475569",         // Slate 600
            heading: "#0f172a",      // Slate 900
            background: "#ffffff"    // White
        },
        fonts: {
            heading: "Cormorant+Garamond:wght@400;500;600;700",
            body: "Inter:wght@300;400;500;600"
        },
        borderRadius: "0.5rem" // rounded-lg
    }
};

export const defaultTheme = themePresets.blue;

export const firmData: Record<string, FirmConfig> = {
    el: {
        lawyer: {
            firstName: "Γεώργιος",
            lastName: "Παπαδόπουλος",
            fullName: "Γεώργιος Παπαδόπουλος",
            title: "Δικηγόρος - LL.M. Δικαίου Διανοητικής Ιδιοκτησίας",
            shortBio: "Εξειδικευμένες νομικές υπηρεσίες με έμφαση στο Δίκαιο Πνευματικής και Βιομηχανικής Ιδιοκτησίας. 10 χρόνια δυναμικής παρουσίας και αφοσίωσης στην προστασία των καινοτομιών και των δικαιωμάτων των πελατών μας.",
            aboutText: `<p class="mb-4">Μετά την αποφοίτησή μου από τη Νομική Σχολή και την απόκτηση Μεταπτυχιακού Διπλώματος (LL.M.) με εξειδίκευση στο Δίκαιο των Διπλωμάτων Ευρεσιτεχνίας και της Διανοητικής Ιδιοκτησίας, έχω αφιερώσει την τελευταία δεκαετία στην παροχή υψηλού επιπέδου νομικών συμβουλών στην Αθήνα.</p>
<p>Το γραφείο μας συνδυάζει τη σύγχρονη τεχνογνωσία με την προσωπική ενασχόληση, προσφέροντας λύσεις σε θέματα εμπορικών σημάτων, ευρεσιτεχνιών, εταιρικού δικαίου και αστικών διαφορών. Πιστεύω στη στρατηγική προσέγγιση κάθε υπόθεσης, διασφαλίζοντας ότι η δημιουργικότητα και η επιχειρηματικότητα των πελατών μου προστατεύονται πλήρως σε ένα διαρκώς μεταβαλλόμενο νομικό περιβάλλον.</p>`,
            profileImage: "/generic_lawyer.jpg"
        },
        contact: {
            phone: "+30 210 1234567",
            email: "info@papadopoulos-law.gr",
            address: {
                street: "Λεωφόρος Βασιλίσσης Σοφίας",
                number: "100",
                city: "Αθήνα",
                postalCode: "101 74",
                mapUrl: "https://maps.app.goo.gl/generic-location",
                mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3144.896758410078!2d23.7438!3d37.9838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDU5JzAxLjciTiAyM8KwNDQnMzcuNyJF!5e0!3m2!1sel!2sgr!4v1620000000000!5m2!1sel!2sgr"
            },
            hours: {
                weekdays: "Δευτέρα - Παρασκευή: 9:00 - 18:00",
                weekend: "Σάββατο: Κατόπιν ραντεβού"
            },
            socials: {
                facebook: "https://www.facebook.com",
                instagram: "https://www.instagram.com",
            }
        },
        stats: {
            yearsExperience: "10",
            casesWon: "450+",
            successRate: "96%",
            happyClients: "380+",
            labels: {
                years: "Χρόνια Εμπειρίας",
                cases: "Επιτυχημένες Υποθέσεις",
                rate: "Ποσοστό Επιτυχίας",
                clients: "Ικανοποιημένοι Πελάτες"
            }
        },
        services: [
            {
                title: "Πνευματική Ιδιοκτησία",
                description: "Προστασία εμπορικών σημάτων, πνευματικών δικαιωμάτων και διαχείριση χαρτοφυλακίων διανοητικής ιδιοκτησίας για δημιουργούς και επιχειρήσεις.",
                iconPath: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            },
            {
                title: "Διπλώματα Ευρεσιτεχνίας",
                description: "Εξειδικευμένη υποστήριξη στην κατοχύρωση ευρεσιτεχνιών (patents), έρευνα προηγούμενης στάθμης της τεχνικής και αντιμετώπιση προσβολών.",
                iconPath: "M9.663 17h4.674a1 1 0 00.922-.617l2.1-5.148A2 2 0 0015.514 8.5L12 8.5V7a1 1 0 00-1-1H9a1 1 0 00-1 1v1.5L4.486 8.5a2 2 0 00-1.845 2.735l2.1 5.148a1 1 0 00.922.617H9.663z"
            },
            {
                title: "Εταιρικό Δίκαιο",
                description: "Συμβουλευτική σε θέματα ίδρυσης εταιρειών, εμπορικών συμφωνιών και νομικής υποστήριξης νεοφυών επιχειρήσεων (startups).",
                iconPath: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            },
            {
                title: "Αστικό Δίκαιο",
                description: "Εκπροσώπηση σε υποθέσεις αστικού δικαίου, μισθωτικές διαφορές και διεκδικήσεις αποζημιώσεων με έμφαση στην εξωδικαστική επίλυση.",
                iconPath: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
            },
            {
                title: "Συμβάσεις",
                description: "Σύνταξη και έλεγχος εξειδικευμένων συμβάσεων παραχώρησης αδειών (licensing), εμπιστευτικότητας (NDA) και εμπορικής συνεργασίας.",
                iconPath: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            },
            {
                title: "Ψηφιακό Δίκαιο",
                description: "Νομική υποστήριξη για ηλεκτρονικό εμπόριο, προστασία δεδομένων (GDPR) και ζητήματα διαδικτύου.",
                iconPath: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
            }
        ],
        testimonials: [
            {
                quote: "Η βοήθεια του κ. Παπαδόπουλου στην κατοχύρωση του παγκόσμιου διπλώματος ευρεσιτεχνίας μας ήταν καθοριστική. Η εξειδίκευσή του στα patents είναι σπάνια για τα ελληνικά δεδομένα.",
                author: "Δρ. Αλέξανδρος Παππάς",
                role: "Ιδρυτής BioTech Solutions",
                initials: "ΑΠ"
            },
            {
                quote: "Εξαιρετικός επαγγελματίας. Μας βοήθησε να προστατεύσουμε το εμπορικό μας σήμα σε ευρωπαϊκό επίπεδο και μας συμβούλεψε σωστά σε πολύπλοκα νομικά ζητήματα τεχνολογίας.",
                author: "Ελένη Δούκα",
                role: "Marketing Director, AppDesign O.E.",
                initials: "ΕΔ"
            },
            {
                quote: "Σύγχρονη προσέγγιση και άμεση ανταπόκριση. Κατανόησε αμέσως τις ανάγκες της startup μας και θωράκισε νομικά τη συνεργασία μας με επενδυτές από το εξωτερικό.",
                author: "Νικόλαος Γεωργίου",
                role: "Co-founder, GreenEnergy IKE",
                initials: "ΝΓ"
            }
        ],
        ui: {
            aboutMe: "Σχετικά με Εμένα",
            aboutTitle: "Σύγχρονη Νομική Προσέγγιση",
            excellence: "Χρόνια Εμπειρίας",
            memberBar: "Μέλος Δικηγορικού Συλλόγου Αθηνών",
            appealCourt: "Δικηγόρος παρ' Εφέταις",
            fluentEnglish: "Άριστη γνώση Αγγλικών",
            modernApproach: "Εξειδίκευση στην Καινοτομία",
            bookAppointment: "Κλείστε Ραντεβού",
            learnMore: "Μάθετε Περισσότερα",
            contactSection: "Επικοινωνία",
            contactTitle: "Κλείστε Ραντεβού",
            contactDesc: "Κάντε το πρώτο βήμα για την επίλυση των νομικών σας ζητημάτων. Επικοινωνήστε μαζί μας σήμερα για μια εμπιστευτική συνάντηση.",
            addressLabel: "Διεύθυνση Γραφείου",
            phoneLabel: "Τηλέφωνο",
            emailLabel: "Email",
            hoursLabel: "Ώρες Λειτουργίας",
            formName: "Όνομα",
            formLastName: "Επώνυμο",
            formEmail: "Email",
            formPhone: "Τηλέφωνο",
            formTopic: "Τομέας Δικαίου",
            formMessage: "Μήνυμα",
            formMessagePlaceholder: "Περιγράψτε σύντομα το νομικό σας ζήτημα...",
            formPrivacy: "Έχω διαβάσει και συμφωνώ με την",
            formPrivacyLink: "Πολιτική Απορρήτου",
            formPrivacyConsent: "και δίνω τη συγκατάθεσή μου για την επεξεργασία των προσωπικών μου δεδομένων.",
            formSubmit: "Αποστολή Μηνύματος",
            formSubmitting: "Αποστολή...",
            formSuccess: "Το μήνυμά σας εστάλη!",
            formSuccessDesc: "Θα επικοινωνήσουμε μαζί σας το συντομότερο δυνατό.",
            formError: "Σφάλμα αποστολής",
            formErrorDesc: "Υπήρξε ένα πρόβλημα. Παρακαλώ ελέγξτε τη σύνδεσή σας ή προσπαθήστε αργότερα.",
            selectTopic: "Επιλέξτε τομέα δικαίου",
            formPrivacyValidation: "Παρακαλώ επιλέξτε αυτό το κουτάκι αν θέλετε να προχωρήσετε.",
            markdownHint: "Μπορείτε να μορφοποιήσετε το κείμενό σας χρησιμοποιώντας Markdown. Για παράδειγμα: **έντονα**, *πλάγια*, ή - λίστες.",
            markdownGuideLink: "Δείτε τον οδηγό Markdown",

        },
        meta: {
            title: "Γεώργιος Παπαδόπουλος | Δικηγόρος - LL.M. Πνευματικής Ιδιοκτησίας | Αθήνα",
            description: "Δικηγορικό Γραφείο Γεωργίου Παπαδόπουλου. Εξειδίκευση σε Διπλώματα Ευρεσιτεχνίας και Πνευματική Ιδιοκτησία στην Αθήνα."
        }
    },
    en: {
        lawyer: {
            firstName: "Georgios",
            lastName: "Papadopoulos",
            fullName: "Georgios Papadopoulos",
            title: "Attorney at Law - LL.M. in Intellectual Property",
            shortBio: "Specialized legal services with a focus on Intellectual Property and Patent Law. 10 years of dynamic practice dedicated to protecting innovation and client rights.",
            aboutText: `<p class="mb-4">After graduating from Law School and obtaining my Master of Laws (LL.M.) specialized in Patent Law and Intellectual Property, I have dedicated the past decade to providing high-level legal counsel in Athens.</p>
<p>Our firm combines modern expertise with a personal touch, offering solutions in trademarks, patents, corporate law, and civil litigation. I believe in a strategic approach to every case, ensuring that my clients' creativity and entrepreneurship are fully protected in an ever-evolving legal landscape.</p>`,
            profileImage: "/generic_lawyer.jpg"
        },
        contact: {
            phone: "+30 210 1234567",
            email: "info@papadopoulos-law.gr",
            address: {
                street: "Vasilissis Sofias Avenue",
                number: "100",
                city: "Athens",
                postalCode: "101 74",
                mapUrl: "https://maps.app.goo.gl/generic-location",
                mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3144.896758410078!2d23.7438!3d37.9838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDU5JzAxLjciTiAyM8KwNDQnMzcuNyJF!5e0!3m2!1sen!2sgr!4v1620000000000!5m2!1sen!2sgr"
            },
            hours: {
                weekdays: "Monday - Friday: 9:00 - 18:00",
                weekend: "Saturday: By Appointment"
            },
            socials: {
                facebook: "https://www.facebook.com",
                instagram: "https://www.instagram.com",
            }
        },
        stats: {
            yearsExperience: "10",
            casesWon: "350+",
            successRate: "96%",
            happyClients: "280+",
            labels: {
                years: "Years of Experience",
                cases: "Successful Cases",
                rate: "Success Rate",
                clients: "Happy Clients"
            }
        },
        services: [
            {
                title: "Intellectual Property",
                description: "Protection of trademarks, copyrights, and IP portfolio management for creators and businesses.",
                iconPath: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            },
            {
                title: "Patent Law",
                description: "Expert support in patent registration, prior art search, and handling infringement cases.",
                iconPath: "M9.663 17h4.674a1 1 0 00.922-.617l2.1-5.148A2 2 0 0015.514 8.5L12 8.5V7a1 1 0 00-1-1H9a1 1 0 00-1 1v1.5L4.486 8.5a2 2 0 00-1.845 2.735l2.1 5.148a1 1 0 00.922.617H9.663z"
            },
            {
                title: "Corporate Law",
                description: "Counsel on company formation, commercial agreements, and legal support for startups.",
                iconPath: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            },
            {
                title: "Civil Law",
                description: "Representation in civil cases, lease disputes, and compensation claims with a focus on out-of-court settlement.",
                iconPath: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
            },
            {
                title: "Contracts",
                description: "Drafting and reviewing licensing agreements, NDAs, and commercial cooperation contracts.",
                iconPath: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            },
            {
                title: "Digital Law",
                description: "Legal support for e-commerce, data protection (GDPR), and internet-related legal issues.",
                iconPath: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
            }
        ],
        testimonials: [
            {
                quote: "Mr. Papadopoulos's help in securing our global patent was decisive. His expertise in patents is rare for Greek standards.",
                author: "Dr. Alexander Pappas",
                role: "Founder, BioTech Solutions",
                initials: "AP"
            },
            {
                quote: "Excellent professional. He helped us protect our trademark at a European level and advised us correctly on complex legal tech issues.",
                author: "Eleni Douka",
                role: "Marketing Director, AppDesign Ltd.",
                initials: "ED"
            },
            {
                quote: "Modern approach and immediate response. He immediately understood our startup's needs and legally shielded our cooperation with foreign investors.",
                author: "Nicholas Georgiou",
                role: "Co-founder, GreenEnergy P.C.",
                initials: "NG"
            }
        ],
        ui: {
            aboutMe: "About Me",
            aboutTitle: "Modern Legal Approach",
            excellence: "Years of Experience",
            memberBar: "Member of Athens Bar Association",
            appealCourt: "Attorney at the Court of Appeal",
            fluentEnglish: "Fluent in English",
            modernApproach: "Innovation Specialist",
            bookAppointment: "Book an Appointment",
            learnMore: "Learn More",
            contactSection: "Contact",
            contactTitle: "Book an Appointment",
            contactDesc: "Take the first step towards resolving your legal matters. Contact us today for a confidential meeting.",
            addressLabel: "Office Address",
            phoneLabel: "Phone",
            emailLabel: "Email",
            hoursLabel: "Opening Hours",
            formName: "First Name",
            formLastName: "Last Name",
            formEmail: "Email",
            formPhone: "Phone",
            formTopic: "Practice Area",
            formMessage: "Message",
            formMessagePlaceholder: "Briefly describe your legal issue...",
            formPrivacy: "I have read and agree to the",
            formPrivacyLink: "Privacy Policy",
            formPrivacyConsent: "and I give my consent for the processing of my personal data.",
            formSubmit: "Send Message",
            formSubmitting: "Sending...",
            formSuccess: "Message Sent!",
            formSuccessDesc: "We will contact you as soon as possible.",
            formError: "Submission Error",
            formErrorDesc: "There was a problem. Please check your connection or try again later.",
            selectTopic: "Select practice area",
            formPrivacyValidation: "Please check this box if you want to proceed.",
            markdownHint: "You can format your text using Markdown. For example: **bold**, *italics*, or - lists.",
            markdownGuideLink: "See Markdown guide",

        },
        meta: {
            title: "Georgios Papadopoulos | Attorney - LL.M. Intellectual Property | Athens",
            description: "Law Office of Georgios Papadopoulos. Specialized in Patent Law and Intellectual Property in Athens."
        }
    }
};
