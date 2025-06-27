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
const drizzle_1 = require("./drizzle");
const drizzle_orm_1 = require("drizzle-orm");
const schema_1 = require("../db/schema");
// Clear any existing strategies to prevent conflicts
passport_1.default.unuse('google');
passport_1.default.serializeUser((user, done) => {
    done(null, user.id);
});
passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const USER = yield drizzle_1.DB.query.USERS.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.USERS.id, id)
        });
        done(null, USER);
    }
    catch (err) {
        console.error('Passport deserialize error:', err);
        done(err, null);
    }
}));
passport_1.default.use('google', new passport_google_oauth20_1.Strategy({
    clientID: configs_1.Google.GOOGLE_CLIENT_ID,
    clientSecret: configs_1.Google.GOOGLE_CLIENT_SECRET,
    callbackURL: `${configs_1.Environment.BASE_URL}/auth/google/callback`
}, (_accessToken, _refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const existingUser = yield drizzle_1.DB.query.USERS.findFirst({
            where: (0, drizzle_orm_1.eq)(schema_1.USERS.googleId, profile.id)
        });
        if (existingUser) {
            return done(null, existingUser);
        }
        const [newUser] = yield drizzle_1.DB.insert(schema_1.USERS).values({
            googleId: profile.id,
            email: ((_a = profile.emails) === null || _a === void 0 ? void 0 : _a[0].value) || '',
            name: profile.displayName,
            avatar: ((_b = profile.photos) === null || _b === void 0 ? void 0 : _b[0].value) || ''
        }).returning();
        return done(null, newUser);
    }
    catch (error) {
        console.error('Google OAuth error:', error);
        return done(error, undefined);
    }
})));
exports.default = passport_1.default;
