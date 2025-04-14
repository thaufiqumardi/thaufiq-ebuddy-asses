import { Request, Response, NextFunction } from 'express';

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const authorized = true;
  if (!authorized) {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  }

  next();
};

