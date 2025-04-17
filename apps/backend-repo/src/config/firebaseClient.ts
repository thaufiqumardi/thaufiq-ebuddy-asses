import { initializeApp, getApps } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'ADzaSyBJoRJWk4RyIlyrdcSbvwHoa37-R-Gg8t0',
  authDomain: 'localhost',
  projectId: 'e-buddy-assessment',
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
const clientAuth = getAuth(app);

connectAuthEmulator(clientAuth, 'http://localhost:9099');

export { clientAuth };
