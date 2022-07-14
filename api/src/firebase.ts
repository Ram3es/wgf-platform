import { credential } from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const serviceAccount = require(process.env.FIREBASE_SERVICE_FILE);

export const app = initializeApp({
  credential: credential.cert(serviceAccount),
});

export const firestore = getFirestore(app);

export const fireAuth = getAuth(app);
