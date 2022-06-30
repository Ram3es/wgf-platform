import { credential } from 'firebase-admin';
import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

const KEYS = {
  credential: credential.cert({
    clientEmail: process.env.FIREBASE_SERVICE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_SERVICE_PRIVATE_KEY,
    projectId: process.env.FIREBASE_SERVICE_PROJECT_ID,
  }),
};

export const app = initializeApp(KEYS);

export const firestore = getFirestore(app);

export const fireAuth = getAuth(app);
