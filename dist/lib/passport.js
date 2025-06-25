"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const configs_1 = require("../configs");
const prisma_1 = require("./prisma");
// Clear any existing strategies to prevent conflicts
passport_1.default.unuse('google');
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma_1.PRISMA.user.findUnique({
            where: { id }
        });
        done(null, user);
    }
    catch (err) {
        console.error('Passport deserialize error:', err);
        done(err, null);
    }
}));
passport_1.default.use('google', new passport_google_oauth20_1.Strategy({
    clientID: configs_1.Google.GOOGLE_CLIENT_ID,
    clientSecret: configs_1.Google.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:7000/auth/google/callback"
}, (_accessToken, _refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Use a transaction to ensure consistency
        const result = yield prisma_1.PRISMA.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            const existingUser = yield tx.user.findUnique({
                where: { googleId: profile.id },
            });
            if (existingUser) {
                return existingUser;
            }
            // Also check by email to prevent duplicates
            const existingEmailUser = yield tx.user.findUnique({
                where: { email: ((_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0].value) || '' },
            });
            if (existingEmailUser) {
                // Update existing user with Google ID
                return yield tx.user.update({
                    where: { id: existingEmailUser.id },
                    data: {
                        googleId: profile.id,
                        avatar: ((_b = profile.photos) === null || _b === void 0 ? void 0 : _b[0].value) || existingEmailUser.avatar,
                    },
                });
            }
            // Create new user
            return yield tx.user.create({
                data: {
                    googleId: profile.id,
                    email: ((_c = profile.emails) === null || _c === void 0 ? void 0 : _c[0].value) || '',
                    name: profile.displayName || 'User',
                    avatar: ((_d = profile.photos) === null || _d === void 0 ? void 0 : _d[0].value) || '',
                },
            });
        }));
        return done(null, result);
    }
    catch (error) {
        console.error('Google OAuth error:', error);
        return done(error, undefined);
    }
})));
exports.default = passport_1.default;
