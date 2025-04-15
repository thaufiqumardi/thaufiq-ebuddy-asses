import { db } from '@/config/firebaseConfig';
import { CreateUserDTO } from '@shared/types/user';

export const getAllUsers = async () => {
  const snapshot = await db.collection('users').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const createUser = async (userData: CreateUserDTO) => {
  const now = Date.now();
  const docRef = await db.collection('users').add({
    ...userData,
    createdAt: now,
    updatedAt: now,
  });
  return { id: docRef.id, ...userData };
}

export const updateUser = async (userId: string, userData: CreateUserDTO) => {
  if (!userId || typeof userId !== 'string') {
    throw new Error('Invalid or missing user ID');
  }
  const now = Date.now();
  const userRef = db.collection('users').doc(userId);
  const doc = await userRef.get();
  if (!doc.exists) {
    throw new Error('User not found');
  }
  if (doc.exists) {
    await userRef.update({
      ...userData,
      updatedAt: now,
    });
    return { id: userId, ...userData };
  }
}