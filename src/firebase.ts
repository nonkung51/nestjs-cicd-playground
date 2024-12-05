import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

const firebaseConfig = {
  projectId: 'demo-project',
  // Add other config as needed
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Connect to emulator if in test environment
if (process.env.NODE_ENV === 'test') {
  connectFirestoreEmulator(db, 'localhost', 8080);
}