import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useUser } from '../auth/UserContext';
import { Button, AppBar, ContentLayout } from '../components';

const Title = styled.h1`
  font-size: 1em;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  font-weight: 100;
  letter-spacing: 4px;
  line-height: 1;
  display: inline;
`;

export default () => {
  const user = useUser();

  return (
    <>
      <AppBar>
        <div>
          <Title className="next-to">pantry</Title>
          {/* some status indicator of connectivity */}
          {/* <small>online</small> */}
        </div>
        <div>
          <Button disabled title="Add a new pantry item">
            new
          </Button>
          {!user && (
            <Link href="/login">
              <Button disabled={!!user}>log in</Button>
            </Link>
          )}
        </div>
      </AppBar>
      <ContentLayout>items</ContentLayout>
    </>
  );
};
