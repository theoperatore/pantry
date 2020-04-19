import * as admin from 'firebase-admin';

const creds = process.env.GCLOUD_CREDENTIALS;
const dbUrl = process.env.FIREBASE_DATABASE_URL;

if (!creds) {
  throw new Error('no GCLOUD_CREDENTIALS found in environment');
}

const serviceAccount = JSON.parse(
  Buffer.from(creds, 'base64').toString('utf8')
);

/**
 * Utility function to help verify that a user is logged in.
 * Should be called whenever an action is taken via the api.
 * @param token The IdToken from calling firebase.auth().currentUser.getIdToken()
 * @returns Promise of the decoded token. Throws/rejects if invalid token
 */
export function verifyUserToken(token: string) {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: dbUrl,
    });
  }

  return admin.auth().verifyIdToken(token);
}
