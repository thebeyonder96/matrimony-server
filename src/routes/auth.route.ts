import { Router } from "express";
import passport from 'passport';
import { ensureAuth } from "../middlewares/ensureAuth";

const AUTH_ROUTER = Router();

AUTH_ROUTER.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

AUTH_ROUTER.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/auth/failure',
    session: true
  }),
  (req, res) => {
    return res.redirect('http://localhost:3000/profile');
  }

);

AUTH_ROUTER.get('/logout', (req, res) => {
  req.logout(() => {
    req.session.destroy(() => res.redirect('/'));
  });
});

AUTH_ROUTER.get('/failure', (_req, res) => {
  res.send('Failed to authenticate...');
});

AUTH_ROUTER.get('/user', ensureAuth, (req, res) => {
  if(!req.user){
    res.status(401).json('Unauthorized').redirect('/profile')
    return 
  }
  res.json(req.user);
});

export default AUTH_ROUTER;
