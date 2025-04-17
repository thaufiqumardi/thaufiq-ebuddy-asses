import { Request, Response } from 'express';
import { createUser, getAllUsers, updateUser } from '../repository/userCollection';
import { CreateUserDTO } from '../../../../shared/types/user';

export const handleFetchUser = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const cursor = req.query.cursor ? Number(req.query.cursor) : undefined;
    const prevCursor = req.query.prevCursor ? Number(req.query.prevCursor) : undefined;

    // Pass cursor or prevCursor to the getAllUsers function based on query parameters
    const result = await getAllUsers({
      limit,
      startAfterValue: cursor,    // For next page (forward pagination)
      endBeforeValue: prevCursor, // For previous page (backward pagination)
    });

    res.status(200).json(result);
  } catch (error) {
    console.error('Fetch users failed:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const handleUpdateUser = async (req: Request, res: Response) => {
  const { id, name, email } = req.body;
  try {
    const updatedUser = await updateUser(id, {
      name,
      email,
    });
    if (updatedUser) {
      res.status(200).json({ message: 'User updated' });
      return;
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export const handleCreateUser = async (req: Request, res: Response) => {
  const { name, email } = req.body as CreateUserDTO;
  if (!name || !email) {
    res.status(400).json({ message: 'Please provide name and email' });
    return;
  }
  const docRef = await createUser({
    name,
    email,
  });

  res.status(201).json({ id: docRef.id, message: 'User created' });
}
