import fs from 'fs';
import path from 'path';
import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useUser } from '../auth/UserContext';
import { Button, AppBar, ContentLayout, Item } from '../components';

const Title = styled.h1`
  font-size: 1em;
  color: ${({ theme }) => theme.colors.primary};
  text-transform: uppercase;
  font-weight: 100;
  letter-spacing: 4px;
  line-height: 1;
  display: inline;
`;

const tmp = [
  {
    name: 'Asparagus',
    iconUrl: '/foods/icons8-asparagus-100.png',
    quantity: 1,
  },
  { name: 'Avacado', iconUrl: '/foods/icons8-avocado-100.png', quantity: 1 },
  { name: 'Bacon', iconUrl: '/foods/icons8-bacon-100.png', quantity: 1 },
  {
    name: 'Carrot',
    iconUrl: '/foods/icons8-big-carrot-100.png',
    quantity: 1,
  },
  { name: 'Bread', iconUrl: '/foods/icons8-bread-100.png', quantity: 1 },
  {
    name: 'Cauliflower',
    iconUrl: '/foods/icons8-cauliflower-100.png',
    quantity: 1,
  },
  { name: 'Cheese', iconUrl: '/foods/icons8-cheese-100.png', quantity: 1 },
  {
    name: 'Chili pepper',
    iconUrl: '/foods/icons8-chili-pepper-100.png',
    quantity: 1,
  },
  {
    name: 'Chocolate',
    iconUrl: '/foods/icons8-chocolate-bar-100.png',
    quantity: 1,
  },
  {
    name: 'Cinnamon sticks',
    iconUrl: '/foods/icons8-cinnamon-sticks-100.png',
    quantity: 1,
  },
  { name: 'Corn', iconUrl: '/foods/icons8-corn-100.png', quantity: 1 },
  { name: 'Cucumber', iconUrl: '/foods/icons8-cucumber-100.png', quantity: 1 },
  { name: 'Sauce', iconUrl: '/foods/icons8-dressing-100.png', quantity: 1 },
  {
    name: 'Eggs',
    iconUrl: '/foods/icons8-egg-carton-100.png',
    quantity: 1,
  },
  {
    name: 'Fish',
    iconUrl: '/foods/icons8-fish-skeleton-100.png',
    quantity: 1,
  },
  {
    name: 'Whole wheat flour',
    iconUrl: '/foods/icons8-flour-100-2.png',
    quantity: 1,
  },
  {
    name: 'All-purpose flour',
    iconUrl: '/foods/icons8-flour-100.png',
    quantity: 1,
  },
  { name: 'Garlic', iconUrl: '/foods/icons8-garlic-100.png', quantity: 1 },
  { name: 'Grapes', iconUrl: '/foods/icons8-grape-100.png', quantity: 1 },
  { name: 'Greens', iconUrl: '/foods/icons8-greenery-100.png', quantity: 1 },
  { name: 'Honey', iconUrl: '/foods/icons8-honey-100.png', quantity: 1 },
  {
    name: 'Ice cream',
    iconUrl: '/foods/icons8-ice-cream-in-waffle-cone-100.png',
    quantity: 1,
  },
  { name: 'Jam', iconUrl: '/foods/icons8-jam-100.png', quantity: 1 },
  { name: 'Citrus', iconUrl: '/foods/icons8-lemon-100.png', quantity: 1 },
  { name: 'Lettuce', iconUrl: '/foods/icons8-lettuce-100.png', quantity: 1 },
  { name: 'Meat', iconUrl: '/foods/icons8-meat-100.png', quantity: 1 },
  {
    name: 'Sausage',
    iconUrl: '/foods/icons8-meat-sausage-100.png',
    quantity: 1,
  },
  {
    name: 'Milk',
    iconUrl: '/foods/icons8-milk-bottle-100.png',
    quantity: 1,
  },
  { name: 'Mushroom', iconUrl: '/foods/icons8-mushroom-100.png', quantity: 1 },
  {
    name: 'Oil',
    iconUrl: '/foods/icons8-olive-oil-100.png',
    quantity: 1,
  },
  { name: 'Onion', iconUrl: '/foods/icons8-onion-100.png', quantity: 1 },
  { name: 'Orange', iconUrl: '/foods/icons8-orange-100.png', quantity: 1 },
  { name: 'Pepper', iconUrl: '/foods/icons8-paprika-100.png', quantity: 1 },
  { name: 'Potato', iconUrl: '/foods/icons8-potato-100.png', quantity: 1 },
  { name: 'Prawn', iconUrl: '/foods/icons8-prawn-100.png', quantity: 1 },
  { name: 'Squash', iconUrl: '/foods/icons8-pumpkin-100.png', quantity: 1 },
  { name: 'Cured meat', iconUrl: '/foods/icons8-salami-100.png', quantity: 1 },
  {
    name: 'Pizza',
    iconUrl: '/foods/icons8-salami-pizza-100.png',
    quantity: 1,
  },
  { name: 'Salmon', iconUrl: '/foods/icons8-salmon-100.png', quantity: 1 },
  {
    name: 'Strawberry',
    iconUrl: '/foods/icons8-strawberry-100.png',
    quantity: 1,
  },
  {
    name: 'Brown sugar',
    iconUrl: '/foods/icons8-sugar-sack-100-2.png',
    quantity: 1,
  },
  {
    name: 'Granulated sugar',
    iconUrl: '/foods/icons8-sugar-sack-100.png',
    quantity: 1,
  },
  {
    name: 'Poultry',
    iconUrl: '/foods/icons8-thanksgiving-turkey-100.png',
    quantity: 1,
  },
  { name: 'Can', iconUrl: '/foods/icons8-tin-can-100.png', quantity: 1 },
  { name: 'Tomato', iconUrl: '/foods/icons8-tomato-100.png', quantity: 1 },
  {
    name: 'Wine',
    iconUrl: '/foods/icons8-wine-and-grapes-100.png',
    quantity: 1,
  },
];

export default function Pantry() {
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
      <ContentLayout>
        {tmp.map((t) => (
          <Item
            name={t.name}
            quantity={t.quantity}
            iconUrl={t.iconUrl}
            key={t.name}
          />
        ))}
      </ContentLayout>
    </>
  );
}
