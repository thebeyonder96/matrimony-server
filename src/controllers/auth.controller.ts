import { catchAsync } from "../lib/error-handler";
import { Request, Response } from "express";
import { validateEmail } from "../utils/email-validator";

export const signUp = catchAsync(async (req: Request, res: Response) => {
  
});
