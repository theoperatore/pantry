import React from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import useSwr from 'swr';
import styled from 'styled-components';
import { useUser } from '../auth/UserContext';
import {
  Button,
  AppBar,
  ContentLayout,
  Item,
  ItemDetailDialog,
  ItemDetailProvider,
} from '../components';
import { PantryResponse } from '../schema/pantry';
import { getPantry } from '../db';

const Title = styled.h1`
  font-size: 1em;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  font-weight: 100;
  letter-spacing: 4px;
  line-height: 1;
  display: inline;
`;

async function pantryLoader(url: string) {
  const response = await fetch(url);
  if (response.ok) {
    return (await response.json()) as PantryResponse;
  }

  throw new Error('Failed to load pantry');
}

type Props = {
  initialData: PantryResponse;
};

export default function Pantry(props: Props) {
  const user = useUser();
  const { data, error } = useSwr('/api/pantry', pantryLoader, {
    initialData: props.initialData,
  });

  return (
    <ItemDetailProvider>
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
      <ContentLayout>
        {error && <p>Failed pantry request!</p>}
        {data &&
          data.pantry.map((pantryItem) => (
            <Item key={pantryItem.id} item={pantryItem} />
          ))}
      </ContentLayout>
      <ItemDetailDialog />
    </ItemDetailProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const pantryItems = await getPantry();
  const initialProps: Props = {
    initialData: {
      pantry: pantryItems,
    },
  };

  return {
    props: initialProps,
  };
};
