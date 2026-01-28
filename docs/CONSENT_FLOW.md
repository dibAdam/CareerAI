# Consent Flow Documentation

## Overview
The CareerAI platform implements a GDPR-compliant consent flow that ensures users explicitly agree to data processing before using the service.

## User Journey

### 1. **Sign Up**
- User creates account with email/password or OAuth (Google/GitHub)
- Email confirmation sent (if using email/password)
- Profile automatically created in database via trigger

### 2. **Email Confirmation** (Email/Password only)
- User clicks confirmation link in email
- Redirected to `/auth/callback`
- Session established

### 3. **Consent Required**
- Middleware checks if user has accepted consent
- If `consent_accepted = false`, user is redirected to `/consent`
- User cannot access protected routes until consent is given

### 4. **Consent Page** (`/consent`)
User sees:
- What data we store (CV, job descriptions, analysis results, profile info)
- Why we store it (AI matching, progress tracking, improvements)
- Our commitment (encryption, no selling data, right to deletion)
- Checkbox: "I explicitly consent to storage and processing..."
- "Confirm & Continue" button

### 5. **After Consent**
- `consent_accepted` set to `true` in profiles table
- `consent_timestamp` recorded
- User redirected to `/analyze`
- Full platform access granted

## Protected Routes
All routes except `/`, `/login`, `/auth/*`, and `/consent` require:
1. ✅ Valid authentication
2. ✅ Accepted consent

## Middleware Logic
```
User visits protected route
  ↓
Is user logged in?
  ├─ No → Redirect to /login
  └─ Yes → Check consent
            ├─ Not accepted → Redirect to /consent
            └─ Accepted → Allow access
```

## Database Schema
```sql
profiles table:
- consent_accepted: BOOLEAN (default: FALSE)
- consent_timestamp: TIMESTAMP WITH TIME ZONE
```

## Revoking Consent
Users can revoke consent from Settings page, which will:
1. Set `consent_accepted = false`
2. Optionally delete all user data
3. Sign out the user
4. Require re-consent to use the platform again

## Testing
- **With email confirmation disabled**: User signs up → immediately redirected to consent
- **With email confirmation enabled**: User signs up → confirms email → redirected to consent
- **OAuth signup**: User signs up → immediately redirected to consent
