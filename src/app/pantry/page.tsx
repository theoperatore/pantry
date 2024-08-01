import { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getUser } from '@/api/auth/getUser';
import { getAllPantriesForUser } from '@/api/pantry/getAllPantriesForUser';
import { PageHeader } from '@/design/PageHeader';
import { Anchor, Container, List, ListItem, Title } from '@mantine/core';

export const metadata: Metadata = {
  title: 'Pantry - List',
};

export default async function PantryList() {
  const { data } = await getUser();

  if (!data.user) {
    redirect('/login');
  }

  const pantries = await getAllPantriesForUser(data.user.id);

  return (
    <Container>
      <PageHeader>
        <Title>Your pantries</Title>
      </PageHeader>
      <List>
        {pantries.map(pantry => (
          <ListItem key={pantry.id}>
            <Anchor component={Link} href={`/pantry/${pantry.id}`}>
              {pantry.pantry_name}
            </Anchor>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}
