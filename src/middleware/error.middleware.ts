import { Request, Response, NextFunction } from "express";
import { CelebrateError } from "celebrate";

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.stack);

  if (err instanceof CelebrateError) {
    const errorLog: any[] = [];
    err.details.forEach((errorMessage) => {
      console.log(JSON.stringify(errorMessage), "errorMessage");

      errorLog.push(formatJOIErrorMessage(errorMessage.details[0].message));
    });
    console.log(err.details, "message");

    return res.status(400).json({
      error: "Validation failed",
      details: errorLog,
    });
  }

  // Handle other types of errors here
  res.status(500).json({ error: "Internal server error" });
}

const formatJOIErrorMessage = (message: string): string => {
  const cleanedString = message.replace(/["\\]/g, "");

  const formattedString =
    cleanedString.charAt(0).toUpperCase() + cleanedString.slice(1);

  return formattedString;
};
