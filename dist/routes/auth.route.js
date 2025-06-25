"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const ensureAuth_1 = require("../middlewares/ensureAuth");
const AUTH_ROUTER = (0, express_1.Router)();
AUTH_ROUTER.get('/google', passport_1.default.authenticate('google', { scope: ['profile', 'email'] }));
AUTH_ROUTER.get('/google/callback', passport_1.default.authenticate('google', {
    failureRedirect: '/auth/failure',
    session: true
}), (req, res) => {
    return res.redirect('http://localhost:3000/profile');
});
AUTH_ROUTER.get('/logout', (req, res) => {
    req.logout(() => {
        req.session.destroy(() => res.redirect('/'));
    });
});
AUTH_ROUTER.get('/failure', (_req, res) => {
    res.send('Failed to authenticate...');
});
AUTH_ROUTER.get('/user', ensureAuth_1.ensureAuth, (req, res) => {
    if (!req.user) {
        res.status(401).json('Unauthorized').redirect('/profile');
        return;
    }
    res.json(req.user);
});
exports.default = AUTH_ROUTER;
