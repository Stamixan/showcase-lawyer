### 1. Το "Κενό" Ασφαλείας στο Rate Limiting 🚨

Όπως είχαμε συζητήσει, το rate limiting βασίζεται στο email.

- **Το πρόβλημα:** Ένας κακόβουλος χρήστης μπορεί να αλλάζει email (`spam1@test.com`, `spam2@test.com`) και να χτυπάει το AI API σου επ' άπειρον, χρεώνοντάς σε.
- **Η λύση:** Επειδή στο Convex η λήψη της IP είναι περίπλοκη (εξαρτάται από το hosting), πρόσθεσε ένα **Global Rate Limit** ή ένα **CAPTCHA**.
- _Πρόταση:_ Ενσωμάτωσε το **Cloudflare Turnstile** (είναι δωρεάν και αόρατο). Είναι 10 λεπτά δουλειά και θα γλιτώσεις το κεφάλι σου από bots.

### 2. SEO & Metadata (Για να πιάνει το "100/100") 🔍

Βλέπω ότι έχεις `generate-sitemap.js`, που είναι εξαιρετικό. Όμως, πρέπει να σιγουρευτείς ότι κάθε σελίδα έχει δυναμικά Meta Tags.

- **Τι λείπει:** Open Graph tags (για να φαίνεται ωραίο όταν το κάνουν share στο Facebook/LinkedIn).
- **Η αλλαγή:** Στο `src/routes/[lang]/+layout.svelte` ή στα επιμέρους `+page.svelte`, βεβαιώσου ότι ορίζεις:

````html
<meta property="og:title" content="Δικηγορικό Γραφείο Μιχαλίτσης" />
<meta property="og:description" content="..." />
<meta property="og:image" content="/og-image.jpg" /> ```
````

### 3. Error Handling & UX (Η λεπτομέρεια που κάνει τη διαφορά) 🎨

Στο `Contact.svelte`, όταν ο χρήστης πατάει αποστολή:

- **Loading State:** Βεβαιώσου ότι το κουμπί γίνεται "disabled" και δείχνει ένα spinner. Αν ο χρήστης το πατήσει 5 φορές από ανυπομονησία, θα στείλει 5 emails.
- **Feedback:** Αν το AI "σκάσει" (π.χ. server error), ο χρήστης πρέπει να δει ένα φιλικό μήνυμα _"Υπήρξε ένα τεχνικό πρόβλημα, καλέστε μας στο..."_ και όχι _`Error: 500`_.

### 4. Hardcoded Secrets (Προσοχή!) ⚠️

Στο αρχείο `convex/emails.ts` βλέπω:

```typescript
const resend = new Resend(process.env.RESEND_API_KEY);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

```

Αυτό είναι σωστό (χρήση `process.env`).
**ΟΜΩΣ:** Βεβαιώσου ότι όταν κάνεις deploy (στο Vercel/Netlify), έχεις ορίσει αυτά τα Environment Variables και **δεν** θα τα κάνεις ποτέ commit στο GitHub μέσα σε κάποιο `.env` αρχείο. (Βλέπω `.gitignore`, οπότε λογικά είσαι safe, αλλά τσέκαρέ το διπλά).
