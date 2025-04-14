import { Request, Response } from 'express';
import { db } from '@/config/firebaseConfig';
import { getAllUsers } from '@/repository/userCollection';

export const handleFetchUser = async (req: Request, res: Response) => {
  const users = await getAllUsers();
  if (users.length === 0) {
    res.status(404).json({ message: 'No users found' });
    return;
  }
  res.status(200).json(users);
};

export const handleUpdateUser = async (req: Request, res: Response) => {
  const {id, name, email } = req.body;
  
  const now = Date.now();

  if (id) {
    const userRef = db.collection('users').doc(id);
    const doc = await userRef.get();
    if (doc.exists) {
      await userRef.update({
        name,
        email,
        updatedAt: now,
      });
      res.status(200).json({ message: 'User updated' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
    return;
  }

  if (!name || !email) {
    res.status(400).json({ message: 'Please provide name and email' });
    return;
  }
  const docRef = await db.collection('users').add({
    name,
    email,
    createdAt: now,
    updatedAt: now,
  });

  res.status(201).json({ id: docRef.id, message: 'User created' });
};
