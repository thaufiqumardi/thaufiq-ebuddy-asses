import { Request, Response } from 'express';
import { db } from '@/config/firebaseConfig';
import { createUser, getAllUsers, updateUser } from '@/repository/userCollection';
import { CreateUserDTO } from '@shared/types/user';

export const handleFetchUser = async (req: Request, res: Response) => {
  const users = await getAllUsers();
  if (users.length === 0) {
    res.status(404).json({ message: 'No users found' });
    return;
  }
  res.status(200).json(users);
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
