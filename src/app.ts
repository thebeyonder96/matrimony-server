import express, { Errback, NextFunction, Request, Response } from "express";
import { createServer } from "http";
import { LOGGER } from "./lib/logger";
import helmet from "helmet";
import session from 'express-session';
import passport from 'passport';
import compression from 'compression'
import cookieParser from 'cookie-parser'
import ROUTER from "./routes";
import AUTH_ROUTER from "./routes/auth.route";
import cors from 'cors';
import "./lib/passport";

const APP = express();
APP.use(helmet())
APP.use(compression())
APP.use(express.json({limit: '1000kb'}))
APP.use(cookieParser())
APP.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS']
}))

APP.use('/api',ROUTER)

/**
 * Health check
 */
APP.get("/", (req: Request, res: Response) => {
  res.send("Health OK!");
});

APP.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // set to true in production with HTTPS
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);

APP.use(passport.initialize());
APP.use(passport.session());

APP.use('/auth', AUTH_ROUTER);

APP.get('/login', (_req, res) => {
  res.send('<a href="/auth/google">Login with Google</a>');
});

/**
 * Error handling middleware
 */
APP.use((err: Errback, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  LOGGER.error(err);
  const message = err instanceof Error ? err.message : "Something went wrong!";
  res.status(500).json({ error: message });
});

process.on("unhandledRejection", (reason, promise) => {
  LOGGER.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

process.on("uncaughtException", (error) => {
  LOGGER.error("Uncaught Exception:", error);
  process.exit(1);
});

export const SERVER = createServer(APP);
