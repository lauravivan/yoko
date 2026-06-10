import { type FirebaseOptions, initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig: FirebaseOptions = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? '',
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? '',
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? '',
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? '',
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? '',
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? '',
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ?? '',
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

if (import.meta.env.DEV) {
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(db, 'localhost', 8080);
}

export default auth;
