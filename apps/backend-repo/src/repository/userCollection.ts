import { db } from '../config/firebaseConfig';
import { CreateUserDTO } from '../../../../shared/types/user';

export const getAllUsers = async ({
  limit = 10,
  startAfterValue,
  endBeforeValue,
}: {
  limit?: number;
  startAfterValue?: number;
  endBeforeValue?: number;
}) => {
  let query = db.collection('users').orderBy('createdAt', 'desc');

  if (startAfterValue) {
    query = query.startAfter(startAfterValue);
  }

  if (endBeforeValue) {
    query = query.endBefore(endBeforeValue);
  }

  query = query.limit(limit);

  const snapshot = await query.get();

  const users = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const firstVisible = snapshot.docs[0];
  const lastVisible = snapshot.docs[snapshot.docs.length - 1];

  const nextCursor = lastVisible?.data().createdAt;
  const prevCursor = firstVisible?.data().createdAt;

  // Total count of all users
  const totalSnapshot = await db.collection('users').get();
  const total = totalSnapshot.size;

  return {
    users,
    total,
    nextCursor,
    prevCursor,
  };
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

  await userRef.update({
    ...userData,
    updatedAt: now,
  });
  return { id: userId, ...userData };
}