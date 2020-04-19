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

const TokenContext = React.createContext<null | string>(null);

export function UserContext(props: { children: React.ReactNode }) {
  const [token, setToken] = React.useState(null);

  React.useEffect(() => {
    let active = true;
    initFirebase();

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

export function useUser() {
  return React.useContext(TokenContext);
}
