import React from 'react';
import Router from 'next/router';
import StyledFirebaseUI from 'react-firebaseui/StyledFirebaseAuth';
import { useUser, useFirebaseAuth } from '../auth/UserContext';
import firebase from 'firebase/app';
import { ContentLayout, AppBar, Title } from '../components';

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
    <>
      <AppBar>
        <Title>pantry</Title>
      </AppBar>
      <ContentLayout>
        <StyledFirebaseUI firebaseAuth={auth} uiConfig={config} />
      </ContentLayout>
    </>
  );
}
