"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Google = exports.Cloudinary = exports.Database = exports.Environment = exports.JWT = exports.Mailer = exports.ServerConfig = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var ServerConfig;
(function (ServerConfig) {
    ServerConfig.PORT = process.env.PORT;
    ServerConfig.NODE_ENV = process.env.NODE_ENV;
})(ServerConfig || (exports.ServerConfig = ServerConfig = {}));
var Mailer;
(function (Mailer) {
    Mailer.APP_PASSWORD = process.env.APP_PASSWORD;
})(Mailer || (exports.Mailer = Mailer = {}));
var JWT;
(function (JWT) {
    JWT.JWT_SECRET = process.env.JWT_SECRET;
})(JWT || (exports.JWT = JWT = {}));
var Environment;
(function (Environment) {
    Environment.NODE_ENV = process.env.NODE_ENV;
})(Environment || (exports.Environment = Environment = {}));
var Database;
(function (Database) {
    Database.DATABASE_URL = process.env.DATABASE_URL;
})(Database || (exports.Database = Database = {}));
var Cloudinary;
(function (Cloudinary) {
    Cloudinary.CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
    Cloudinary.CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
    Cloudinary.CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME;
})(Cloudinary || (exports.Cloudinary = Cloudinary = {}));
var Google;
(function (Google) {
    Google.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    Google.GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
    Google.CALLBACK_URL = process.env.CALLBACK_URL;
})(Google || (exports.Google = Google = {}));
