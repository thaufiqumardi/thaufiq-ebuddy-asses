import { initializeApp, getApps } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX-X-XXXXX',
  authDomain: 'localhost',
  projectId: 'e-buddy-assessment',
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const clientAuth = getAuth(app);

connectAuthEmulator(clientAuth, 'http://localhost:9099');

export { clientAuth };
