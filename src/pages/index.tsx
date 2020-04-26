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
  { name: 'Avacado', iconUrl: '/foods/icons8-avocado-100.png', quantity: 1 },
  { name: 'Bok choy', iconUrl: '/foods/icons8-bok-choy-100.png', quantity: 1 },
  { name: 'Broccoli', iconUrl: '/foods/icons8-broccoli-100.png', quantity: 1 },
  { name: 'Butter', iconUrl: '/foods/icons8-butter-100.png', quantity: 1 },
  { name: 'Cabbage', iconUrl: '/foods/icons8-cabbage-100.png', quantity: 1 },
  {
    name: 'Pepper',
    iconUrl: '/foods/icons8-chili-pepper-100.png',
    quantity: 1,
  },
  {
    name: 'Cinnamon',
    iconUrl: '/foods/icons8-cinnamon-sticks-100.png',
    quantity: 1,
  },
  { name: 'Citrus', iconUrl: '/foods/icons8-citrus-100.png', quantity: 1 },
  { name: 'Corn', iconUrl: '/foods/icons8-corn-100.png', quantity: 1 },
  { name: 'Egg', iconUrl: '/foods/icons8-egg-100.png', quantity: 1 },
  { name: 'Flour', iconUrl: '/foods/icons8-flour-100.png', quantity: 1 },
  { name: 'Honey', iconUrl: '/foods/icons8-honey-100.png', quantity: 1 },
  {
    name: 'Ice cream',
    iconUrl: '/foods/icons8-ice-cream-cone-100.png',
    quantity: 1,
  },
  {
    name: 'Pasta',
    iconUrl: '/foods/icons8-lasagna-sheets-100.png',
    quantity: 1,
  },
  { name: 'Mushroom', iconUrl: '/foods/icons8-mushroom-100.png', quantity: 1 },
  {
    name: 'Oil',
    iconUrl: '/foods/icons8-olive-oil-100.png',
    quantity: 1,
  },
  { name: 'Onion', iconUrl: '/foods/icons8-onion-100.png', quantity: 1 },
  {
    name: 'Milk',
    iconUrl: '/foods/icons8-pack-of-milk-100.png',
    quantity: 1,
  },
  {
    name: 'Peanut butter',
    iconUrl: '/foods/icons8-peanut-butter-100.png',
    quantity: 1,
  },
  { name: 'Potato', iconUrl: '/foods/icons8-potato-100.png', quantity: 1 },
  { name: 'Prawn', iconUrl: '/foods/icons8-prawn-100.png', quantity: 1 },
  {
    name: 'Meat',
    iconUrl: '/foods/icons8-rack-of-lamb-100.png',
    quantity: 1,
  },
  {
    name: 'Raspberry',
    iconUrl: '/foods/icons8-raspberry-100.png',
    quantity: 1,
  },
  {
    name: 'Rice vinegar',
    iconUrl: '/foods/icons8-rice-vinegar-100.png',
    quantity: 1,
  },
  { name: 'Spinach', iconUrl: '/foods/icons8-spinach-100.png', quantity: 1 },
  {
    name: 'Strawberry',
    iconUrl: '/foods/icons8-strawberry-100.png',
    quantity: 1,
  },
  {
    name: 'Poultry',
    iconUrl: '/foods/icons8-thanksgiving-100.png',
    quantity: 1,
  },
  { name: 'Herbs', iconUrl: '/foods/icons8-thyme-100.png', quantity: 1 },
  { name: 'Tomato', iconUrl: '/foods/icons8-tomato-100.png', quantity: 1 },
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
