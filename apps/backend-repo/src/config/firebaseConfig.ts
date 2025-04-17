import { initializeApp, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

if (!getApps().length) {
  initializeApp();
}

const db = getFirestore();

db.settings({
  host: 'http://localhost:8080',
  ssl: false,
});

export { db };
