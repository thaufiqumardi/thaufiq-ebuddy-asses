import { Request, Response, NextFunction } from 'express';
import { JwtPayload } from 'jsonwebtoken';

// const SECRET_KEY = 'supersecret'; // use from .env file in production

// declare global {
//   namespace Express {
//     interface Request {
//       user?: string | JwtPayload;
//     }
//   }
// }

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader?.split(" ")[1]; // To split the token from the "Bearer" prefix
  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return
  }
  try {
    // Ideally we should decode the token and set req.user (i can do this after `declare global` to extend Express Request)
    // to the decoded value
    // This is just a placeholder, need to replace with actual decoding logic
    
    // const decoded = jwt.verify(token as string, SECRET_KEY);
    // req.user = decoded;
    if (token === 'my-secret-token') {
      next(); // Proceed to the next middleware or route handler
    } else {
      throw new Error('Invalid token');
    }
   
  } catch {
    res.status(403).json({ error: 'Invalid token' });
  }
};

