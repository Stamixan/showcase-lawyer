# Serverless Google Forms & Drive Backend Pattern

## Overview
This document describes a robust "backend-less" architecture for handling form submissions with file uploads using **SvelteKit**, **Google Drive**, and **Google Forms**.

### How it works
1. **User Submission**: The user submits a form (text + files) to the SvelteKit server action.
2. **Validation**: The server validates input using `zod`.
3. **File Upload (Drive)**: Binary files (images, documents) are uploaded to a specific Google Drive folder using a Service Account. The upload returns a public `webViewLink`.
4. **Data Aggregation**: The file's public link is combined with the text fields.
5. **Form Submission (Google)**: The server sends a POST request to a hidden Google Form URL, mimicking a standard form submission.
6. **Persistence**: Data ends up in a Google Sheet (linked to the Form), and files live in Google Drive.

---

## 1. Prerequisites & Setup

### A. Google Cloud Platform (GCP)
1. Create a new Project.
2. Enable the **Google Drive API**.
3. Create a **Service Account**.
4. Generate and download the **JSON Key** for the Service Account.
5. **CRITICAL**: Copy the Service Account's email address (e.g., `my-app@my-project.iam.gserviceaccount.com`).

### B. Google Drive
1. Create a generic folder for uploads.
2. **Share** this folder with the Service Account email (Editor permissions).
3. Note the **Folder ID** (the string at the end of the folder URL).

### C. Google Forms
1. Create a Form with questions matching your frontend fields.
2. Add a short answer question for "Image URL" (or "File Link").
3. Click the "three dots" menu -> **Get pre-filled link**.
4. Fill in dummy data for all fields and click "Get Link".
5. Copy the link. It looks like:
   `https://docs.google.com/forms/d/e/FORM_ID/viewform?entry.12345=Value&entry.67890=Value`
6. Extract:
   - **Form ID**: The long string in the path.
   - **Entry IDs**: The `entry.XXXXXX` keys mapping to your fields.

---

## 2. Environment Variables
Configure your project (e.g., `.env`):

```env
# Private (Server-side only)
PRIVATE_GOOGLE_CLIENT_EMAIL="service-account@project.iam.gserviceaccount.com"
PRIVATE_GOOGLE_API_KEY="-----BEGIN PRIVATE KEY-----
..."
# Note: The Private Key often needs newline handling in code if loaded from .env

# Public (or Private if you prefer hardcoding)
PUBLIC_GOOGLE_DIRECTORY_HOST_ID="YOUR_DRIVE_FOLDER_ID"
```

---

## 3. Implementation Guide for Gemini CLI

**Instructions for Future Gemini:**
When asked to implement this pattern, follow these steps strictly.

### Step 1: Install Dependencies
Ensure `googleapis` or `google-auth-library` is installed, along with `zod` for validation.
*Recommendation*: Use `google-auth-library` for lighter weight authentication if full SDK isn't needed, but the reference implementation uses native fetch with `google-auth-library` for tokens.

### Step 2: Create the Drive Handler
Create `src/lib/server/googleDrive.ts`.
*Use the reference implementation below. It handles auth, hashing (deduplication), uploading, and permission setting.*

**Key Features to Implement:**
- **SHA-1 Checksum**: Calculate hash of file buffer. Check if file exists in Drive (via query `name = 'hash.ext'`). Return existing link if found (saves space).
- **Multipart Upload**: Use raw `fetch` for robust multipart uploads to Google Drive API v3.
- **Permissions**: After upload, hit the `/permissions` endpoint to make the file `role: reader, type: anyone`.

### Step 3: Create the Form Handler
In your `+page.server.ts` action:

1. **Parse & Validate**:
   ```typescript
   const data = await request.formData();
   const schema = z.object({ ... });
   // validate...
   ```

2. **Handle Image**:
   ```typescript
   import { uploadImageDataUrl } from '$lib/server/googleDrive';
   // If receiving base64/dataURL:
   const { webViewLink } = await uploadImageDataUrl(dataUrl);
   // If receiving File object:
   // Convert to ArrayBuffer -> uploadFile(...)
   ```

3. **Map & Submit**:
   ```typescript
   const googleFormData = new FormData();
   googleFormData.append('entry.123456', formData.get('name'));
   googleFormData.append('entry.987654', webViewLink); // The link from Drive

   const googleFormUrl = `https://docs.google.com/forms/u/0/d/e/${FORM_ID}/formResponse`;
   await fetch(googleFormUrl, { method: 'POST', body: googleFormData });
   ```

---

## 4. Reference Code: Google Drive Handler
*Save this as a reusable module.*

```typescript
import { PRIVATE_GOOGLE_CLIENT_EMAIL, PRIVATE_GOOGLE_API_KEY } from '$env/static/private';
import { PUBLIC_GOOGLE_DIRECTORY_HOST_ID } from '$env/static/public';
import { JWT } from 'google-auth-library';

// ... (Include logic for retriveAccessToken, calculateFileName, fileExists, _performMultipartUpload)
// See 'windventure-registration' project src/lib/image-handlers/googleDrive.ts for the robust implementation.
```

## 5. Troubleshooting
- **401 Unauthorized**: Check Service Account email and Key formatting. Key must preserve newlines.
- **403 Forbidden**: Service Account does not have Editor access to the target Drive Folder.
- **Form not submitting**: Check `entry.ID` mappings. If a required field in Google Forms is missing from the payload, it will fail silently (or return 200 but not save). **Disable "Restrict to users in Organization"** in Form Settings.
