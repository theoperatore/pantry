import React from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import useSwr from 'swr';
import { request } from 'graphql-request';
import { useUser } from '../auth/UserContext';
import {
  Button,
  AppBar,
  ContentLayout,
  Item,
  ItemDetailDialog,
  Title,
  NewItemButton,
} from '../components';
import {
  GetPantryQueryResult,
  GetPantryQueryString,
  GetPantryQueryVariables,
} from '../schema';
import { FOOD_IMAGES } from '../lib/foodImages';

async function pantryLoader(query: string, variables: GetPantryQueryVariables) {
  return request<GetPantryQueryResult>('/api/graphql', query, variables);
}

function usePantry(initialData?: GetPantryQueryResult) {
  return useSwr(GetPantryQueryString, pantryLoader, {
    initialData,
  });
}

type Props = {
  initialData: GetPantryQueryResult;
  foodImages: { image: string; name: string }[];
};

export default function Pantry(props: Props) {
  const user = useUser();
  const { data, error, revalidate } = usePantry(props.initialData);

  const [selectedItemId, setSelectedItemId] = React.useState('');
  const selectedItem = data && data.pantry.find((p) => p.id === selectedItemId);

  return (
    <>
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
            <Item
              key={pantryItem.id}
              item={pantryItem}
              onItemSelect={setSelectedItemId}
            />
          ))}
      </ContentLayout>
      <ItemDetailDialog
        item={selectedItem}
        revalidate={revalidate}
        onClose={() => setSelectedItemId('')}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { getPantry } = await import('../db');
  const pantryItems = await getPantry();
  const foodImagesMap = FOOD_IMAGES.map((image) => {
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
