"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuth = ensureAuth;
function ensureAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'Unauthorized' });
}
