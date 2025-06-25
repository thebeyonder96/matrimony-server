import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Google } from '../configs';
import { PRISMA } from './prisma';

// Clear any existing strategies to prevent conflicts
passport.unuse('google');

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await PRISMA.user.findUnique({ 
      where: { id }
    });
    done(null, user);
  } catch (err) {
    console.error('Passport deserialize error:', err);
    done(err, null);
  }
});

passport.use('google', new GoogleStrategy(
  {
    clientID: Google.GOOGLE_CLIENT_ID!,
    clientSecret: Google.GOOGLE_CLIENT_SECRET!,
    callbackURL: "http://localhost:7000/auth/google/callback"
  },
  async (_accessToken, _refreshToken, profile, done) => {
    try {
      // Use a transaction to ensure consistency
      const result = await PRISMA.$transaction(async (tx) => {
        const existingUser = await tx.user.findUnique({
          where: { googleId: profile.id },
        });

        if (existingUser) {
          return existingUser;
        }

        // Also check by email to prevent duplicates
        const existingEmailUser = await tx.user.findUnique({
          where: { email: profile.emails?.[0].value || '' },
        });

        if (existingEmailUser) {
          // Update existing user with Google ID
          return await tx.user.update({
            where: { id: existingEmailUser.id },
            data: {
              googleId: profile.id,
              avatar: profile.photos?.[0].value || existingEmailUser.avatar,
            },
          });
        }

        // Create new user
        return await tx.user.create({
          data: {
            googleId: profile.id,
            email: profile.emails?.[0].value || '',
            name: profile.displayName || 'User',
            avatar: profile.photos?.[0].value || '',
          },
        });
      });

      return done(null, result);
    } catch (error) {
      console.error('Google OAuth error:', error);
      return done(error, undefined);
    }
  }
));

export default passport;