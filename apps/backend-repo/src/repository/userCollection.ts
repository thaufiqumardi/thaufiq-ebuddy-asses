import { db } from '@/config/firebaseConfig';

export const getAllUsers = async () => {
  const snapshot = await db.collection('users').get();
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

//create update if exist and create if not exist function
export const createOrUpdateUser = async (userId: string, userData: any) => {
  const userRef = db.collection('users').doc(userId);
  const doc = await userRef.get();
  if (doc.exists) {
    await userRef.update(userData);
  } else {
    await userRef.set({ ...userData, id: userId });
  }
}