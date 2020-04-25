import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useUser, useSignOut, getToken } from '../auth/UserContext';

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

export default () => {
  const user = useUser();
  const signOut = useSignOut();
  const [status, setStatus] = React.useState('');

  async function getData() {
    const token = await getToken();
    const response = await fetch('/api/pantry', {
      headers: {
        accept: 'application/json',
        authorization: `token ${token}`,
      },
    });

    const data = await response.json();
    setStatus(JSON.stringify(data));
  }

  return (
    <div>
      <Title>{user ? 'My' : 'Your'} page</Title>
      <button onClick={getData}>user is: {user ? 'known' : 'unknown'}</button>
      <p>{status}</p>
      <div className="horizontal side-by-side">
        <div className="next-to">
          <Link href="/login">
            <a>log in</a>
          </Link>
        </div>
        <div className="next-to">
          <Link href="/">
            <a onClick={signOut}>log out</a>
          </Link>
        </div>
      </div>
    </div>
  );
};
