# Google OAuth Setup Guide

This guide will help you set up Google OAuth authentication for your NestJS e-commerce application.

## Prerequisites

1. A Google Cloud Console account
2. Your NestJS application running

## Step 1: Create a Google OAuth Application

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it
4. Create OAuth 2.0 credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Choose "Web application" as application type
   - Add authorized redirect URIs:
     - `http://localhost:3000/auth/google/callback` (for development)
     - Your production callback URL

## Step 2: Install Required Packages

```bash
npm install @nestjs/passport passport passport-google-oauth20 @types/passport-google-oauth20
```

## Step 3: Environment Variables

Add the following environment variables to your `.env` file:

```env
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
```

## Step 4: API Endpoints

The following endpoints are now available for Google OAuth:

### GET /auth/google
Initiates Google OAuth login flow. Redirects to Google for authentication.

### GET /auth/google/callback
Google OAuth callback endpoint. Handles the OAuth response and returns user data with JWT token.

### POST /auth/google/login
Alternative endpoint for Google login (requires proper setup).

## Step 5: Testing

1. Start your application
2. Visit `http://localhost:3000/auth/google` in your browser
3. You'll be redirected to Google for authentication
4. After successful authentication, you'll be redirected back with user data and JWT token

## Features

- ✅ Automatic user creation from Google profile
- ✅ Account linking for existing users
- ✅ JWT token generation
- ✅ Pre-verified Google accounts
- ✅ Secure password handling for OAuth users

## Security Notes

- Google accounts are automatically marked as verified
- Random passwords are generated for OAuth users (not used for login)
- Existing accounts can be linked with Google OAuth
- JWT tokens are issued with standard expiration (1 day)

## Troubleshooting

1. **Redirect URI mismatch**: Ensure your callback URL matches exactly in Google Console
2. **Invalid client**: Check your CLIENT_ID and CLIENT_SECRET
3. **CORS issues**: Configure CORS properly for your frontend application
4. **Token expiration**: Handle token refresh on the frontend

## Production Deployment

1. Update `GOOGLE_CALLBACK_URL` to your production domain
2. Add production redirect URIs in Google Cloud Console
3. Ensure HTTPS is enabled for OAuth callbacks
4. Configure proper CORS settings