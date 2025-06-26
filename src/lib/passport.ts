import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Environment, Google } from '../configs';
import { DB } from './drizzle';
import { eq } from 'drizzle-orm';
import { USERS } from '../db/schema';

// Clear any existing strategies to prevent conflicts
passport.unuse('google');

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const USER = await DB.query.USERS.findFirst({
      where: eq(USERS.id,id)
    })
    done(null, USER);
  } catch (err) {
    console.error('Passport deserialize error:', err);
    done(err, null);
  }
});

passport.use('google', new GoogleStrategy(
  {
    clientID: Google.GOOGLE_CLIENT_ID!,
    clientSecret: Google.GOOGLE_CLIENT_SECRET!,
    callbackURL: `${Environment.BASE_URL}/auth/google/callback`
  },
  async (_accessToken, _refreshToken, profile, done) => {
    try {
      const existingUser = await DB.query.USERS.findFirst({
        where: eq(USERS.googleId, profile.id)
      });

      if (existingUser) {
        return done(null, existingUser);
      }

      const [newUser] = await DB.insert(USERS).values({
        googleId: profile.id,
        email: profile.emails?.[0].value || '',
        name: profile.displayName,
        avatar: profile.photos?.[0].value || ''
      }).returning();

      return done(null, newUser);
    } catch (error) {
      console.error('Google OAuth error:', error);
      return done(error, undefined);
    }
  }
));

export default passport;