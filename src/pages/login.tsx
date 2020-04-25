import React from 'react';
import Router from 'next/router';
import StyledFirebaseUI from 'react-firebaseui/StyledFirebaseAuth';
import { useUser, useFirebaseAuth } from '../auth/UserContext';
import firebase from 'firebase/app';

const config: firebaseui.auth.Config = {
  signInFlow: 'redirect',
  signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
  callbacks: {
    signInSuccessWithAuthResult: () => false,
  },
};

export default function Login() {
  const user = useUser();
  const auth = useFirebaseAuth();

  React.useEffect(() => {
    if (user) {
      Router.replace('/');
    }
  }, [user]);

  return (
    <div>
      <StyledFirebaseUI firebaseAuth={auth} uiConfig={config} />
    </div>
  );
}
