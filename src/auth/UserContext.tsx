import React from 'react';
import firebase from 'firebase/app';
import '@firebase/auth';

const config = {
  apiKey: process.env.FIREBASE_PUBLIC_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
};

function initFirebase() {
  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }
}

initFirebase();

const TokenContext = React.createContext<null | string>(null);

/**
 * Holds the signed-in user context as an auth token. This token is used to make
 * network requests to the pantry api backend.
 * @param props containing the children to render
 */
export function UserContext(props: { children: React.ReactNode }) {
  const [token, setToken] = React.useState(null);

  React.useEffect(() => {
    let active = true;

    const off = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        user.getIdToken().then((t) => {
          if (active) {
            setToken(t);
          }
        });
      } else {
        if (active) {
          setToken(null);
        }
      }
    });

    return () => {
      off();
      active = false;
    };
  }, [setToken]);

  return (
    <TokenContext.Provider value={token}>
      {props.children}
    </TokenContext.Provider>
  );
}

/**
 * Main function to use from this file. It will return the user token
 * in a React context that can be used for two things:
 * 1. Identifying if a user is logged in
 * 2. Making a network request to the pantry api using a bearer token header
 */
export function useUser() {
  return React.useContext(TokenContext);
}

/**
 * Mainly used for dev purposes, signs out a user
 */
export function useSignOut() {
  return () => {
    return firebase.auth().signOut();
  };
}

/**
 * Used only for hooking up this firebase instance
 * with the react-firebaseui instance on the login page
 */
export function useFirebaseAuth() {
  return firebase.auth();
}

/**
 * Get a token to call the pantry backend with.
 *
 * @returns Promise<string> with a real user token,
 * or an empty string if there is no current user.
 */
export function getToken() {
  return new Promise((resolve) => {
    const off = firebase.auth().onAuthStateChanged((user) => {
      off();
      if (user) {
        user.getIdToken().then((t) => {
          resolve(t);
        });
      } else {
        resolve('');
      }
    });
  });
}
