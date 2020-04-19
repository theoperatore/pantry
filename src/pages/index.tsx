import React from 'react';
import styled from 'styled-components';
import { useUser } from '../auth/UserContext';

const Title = styled.h1`
  font-size: 50px;
  color: ${({ theme }) => theme.colors.primary};
`;

export default () => {
  const user = useUser();
  const [status, setStatus] = React.useState('');

  async function getData() {
    const response = await fetch('/api/pantry', {
      headers: {
        accept: 'application/json',
        authorization: `token ${user}`,
      },
    });

    const data = await response.json();
    setStatus(JSON.stringify(data));
  }

  return (
    <div>
      <Title>My page</Title>
      <button onClick={getData}>user is: {user ? 'known' : 'unknown'}</button>
      <div>{status}</div>
    </div>
  );
};
