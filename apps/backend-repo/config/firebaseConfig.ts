// apps/api/firebase.ts
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import serviceAccount from '../firebase-service-account.json';

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount as any),
  });
}

const db = getFirestore();

export { db };
