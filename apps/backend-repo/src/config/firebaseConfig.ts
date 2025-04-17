import { initializeApp, getApps,  } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';


if (!getApps().length) {
  initializeApp();
}

const db = getFirestore();

db.settings({
  host: 'http://localhost:8080',
  ssl: false,
});

const adminAuth = getAuth();

export { db, adminAuth };
