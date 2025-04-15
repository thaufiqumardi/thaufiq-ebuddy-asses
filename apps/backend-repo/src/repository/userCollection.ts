import { db } from '@/config/firebaseConfig';
import { CreateUserDTO } from '@shared/types/user';

export const getAllUsers = async (
  limit: number,
  cursor?: number,
  direction: 'next' | 'prev' = 'next'
) => {
  let query = db.collection('users').orderBy('createdAt', 'desc').limit(limit);

  if (cursor) {
    if (direction === 'next') {
      query = query.startAfter(cursor);
    } else if (direction === 'prev') {
      query = query.endBefore(cursor);
    }
  }

  const snapshot = await query.get();
  const users = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));

  const totalSnap = await db.collection('users').count().get();
  const total = totalSnap.data().count;

  const nextCursor = snapshot.docs[snapshot.docs.length - 1]?.get('createdAt');
  const prevCursor = snapshot.docs[0]?.get('createdAt');

  return {
    users,
    pageSize: users.length,
    total,
    nextCursor,
    prevCursor
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
  if (doc.exists) {
    await userRef.update({
      ...userData,
      updatedAt: now,
    });
    return { id: userId, ...userData };
  }
}