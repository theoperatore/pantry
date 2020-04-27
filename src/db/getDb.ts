import * as admin from 'firebase-admin';

const creds = process.env.GCLOUD_CREDENTIALS;
const dbUrl = process.env.FIREBASE_DATABASE_URL;

if (!creds) {
  throw new Error('no GCLOUD_CREDENTIALS found in environment');
}

const serviceAccount = JSON.parse(
  Buffer.from(creds, 'base64').toString('utf8')
);

export function getDb() {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: dbUrl,
    });
  }

  return admin.firestore();
}
