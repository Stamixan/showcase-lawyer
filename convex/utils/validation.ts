export interface InquiryData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    topic: string;
    message: string;
}

export interface ValidationErrors {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    topic?: string;
    message?: string;
    general?: string;
}

export function validateInquiry(data: InquiryData): ValidationErrors | null {
    const errors: ValidationErrors = {};

    // 1. Name Validation
    if (!data.firstName || data.firstName.trim().length === 0) {
        errors.firstName = "Το όνομα είναι υποχρεωτικό.";
    }
    if (!data.lastName || data.lastName.trim().length === 0) {
        errors.lastName = "Το επώνυμο είναι υποχρεωτικό.";
    }

    // 2. Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = data.email ? data.email.trim() : "";

    if (email) {
        if (!emailRegex.test(email)) {
            errors.email = "Το email δεν είναι έγκυρο.";
        } else if (email.length > 55) {
            errors.email = "Το email δεν μπορεί να υπερβαίνει τους 55 χαρακτήρες.";
        }
    }

    // 3. Phone Validation (Greek Mobile)
    // Normalization: Remove all spaces, dashes, parentheses
    const phone = data.phone ? data.phone.replace(/[\s\-()]/g, "") : "";
    const greekMobileRegex = /^(?:\+30|030)?69\d{8}$/;

    if (phone) {
        if (!greekMobileRegex.test(phone)) {
            errors.phone = "Παρακαλώ εισάγετε ένα έγκυρο ελληνικό κινητό (π.χ. 6912345678).";
        }
    }

    // 4. Contact Method Logic (At least one required)
    if (!email && !phone) {
        errors.general = "Παρακαλώ συμπληρώστε είτε το Email είτε το Τηλέφωνο για να επικοινωνήσουμε μαζί σας.";
    }

    // 5. Message Validation
    if (!data.message || data.message.trim().length === 0) {
        errors.message = "Το μήνυμα είναι υποχρεωτικό.";
    } else if (data.message.length > 10000) {
        errors.message = "Το μήνυμα δεν μπορεί να υπερβαίνει τους 10.000 χαρακτήρες.";
    }

    return Object.keys(errors).length > 0 ? errors : null;
}
