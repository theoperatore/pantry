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
  GetPantryQueryVariables,
} from '../graphql/__generated__';
import { GetPantryQueryString } from '../graphql/queries/get-pantry';

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
  const foodImages = getFoodImages();

  const initialProps: Props = {
    initialData: {
      pantry: pantryItems,
    },
    foodImages,
  };

  return {
    props: initialProps,
  };
};

function getFoodImages() {
  return [
    'icons8-asparagus-100.png',
    'icons8-avocado-100.png',
    'icons8-bacon-100.png',
    'icons8-big-carrot-100.png',
    'icons8-bread-100.png',
    'icons8-cauliflower-100.png',
    'icons8-cheese-100.png',
    'icons8-chili-pepper-100.png',
    'icons8-chocolate-bar-100.png',
    'icons8-cinnamon-sticks-100.png',
    'icons8-corn-100.png',
    'icons8-cucumber-100.png',
    'icons8-dressing-100.png',
    'icons8-egg-carton-100.png',
    'icons8-fish-skeleton-100.png',
    'icons8-flour-100-2.png',
    'icons8-flour-100.png',
    'icons8-garlic-100.png',
    'icons8-grape-100.png',
    'icons8-greenery-100.png',
    'icons8-honey-100.png',
    'icons8-ice-cream-in-waffle-cone-100.png',
    'icons8-jam-100.png',
    'icons8-lemon-100.png',
    'icons8-lettuce-100.png',
    'icons8-meat-100.png',
    'icons8-meat-sausage-100.png',
    'icons8-milk-bottle-100.png',
    'icons8-mushroom-100.png',
    'icons8-olive-oil-100.png',
    'icons8-onion-100.png',
    'icons8-orange-100.png',
    'icons8-paprika-100.png',
    'icons8-potato-100.png',
    'icons8-prawn-100.png',
    'icons8-pumpkin-100.png',
    'icons8-salami-100.png',
    'icons8-salami-pizza-100.png',
    'icons8-salmon-100.png',
    'icons8-strawberry-100.png',
    'icons8-sugar-sack-100-2.png',
    'icons8-sugar-sack-100.png',
    'icons8-thanksgiving-turkey-100.png',
    'icons8-tin-can-100.png',
    'icons8-tomato-100.png',
    'icons8-wine-and-grapes-100.png',
  ].map((image) => {
    const foodName = image.replace('icons8-', '').replace('-100.png', '');
    return {
      image,
      name: foodName.replace('-', ''),
    };
  });
}
