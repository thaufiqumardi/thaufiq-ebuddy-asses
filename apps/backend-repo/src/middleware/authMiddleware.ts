import { Request, Response, NextFunction } from 'express';
import { adminAuth } from '../config/firebaseConfig';

declare global {
  namespace Express {
    interface Request {
      user?: any; // Extend the Request object to include a `user` property
    }
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "Unauthorized: Missing or invalid Authorization header" });
    return;
  }

  const token = authHeader.split(" ")[1]; // Extract the token from the "Bearer" prefix

  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
