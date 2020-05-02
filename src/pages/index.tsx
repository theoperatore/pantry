import React from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import useSwr from 'swr';
import { useUser } from '../auth/UserContext';
import fs from 'fs';
import path from 'path';
import {
  Button,
  AppBar,
  ContentLayout,
  Item,
  ItemDetailDialog,
  ItemDetailProvider,
  Title,
} from '../components';
import { PantryResponse } from '../schema/pantry';
import { getPantry } from '../db';
import { NewItemButton } from '../components/NewItemButton';

async function pantryLoader(url: string) {
  const response = await fetch(url);
  if (response.ok) {
    return (await response.json()) as PantryResponse;
  }

  throw new Error('Failed to load pantry');
}

type Props = {
  initialData: PantryResponse;
  foodImages: { image: string; name: string }[];
};

export default function Pantry(props: Props) {
  const user = useUser();
  const { data, error, revalidate } = useSwr('/api/pantry', pantryLoader, {
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
          <NewItemButton
            foodImages={props.foodImages}
            onSaveSuccess={revalidate}
          />
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
  console.log(process.cwd());
  const foodImages = fs.readdirSync(path.join(process.cwd(), '/public/foods'));
  const foodImagesMap = foodImages.map((image) => {
    const foodName = image.replace('icons8-', '').replace('-100.png', '');
    return {
      image,
      name: foodName.replace('-', ''),
    };
  });
  const initialProps: Props = {
    initialData: {
      pantry: pantryItems,
    },
    foodImages: foodImagesMap,
  };

  return {
    props: initialProps,
  };
};
