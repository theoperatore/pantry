import { Metadata } from 'next';
import Link from 'next/link';
import { createClient } from '@/db/auth';
import { PageHeader } from '@/design/PageHeader';
import { Anchor, Container, Text, Title } from '@mantine/core';

export const metadata: Metadata = {
  title: 'Pantry - Logout',
};

export default async function Logout() {
  const client = createClient();

  await client.auth.signOut();

  return (
    <Container p="xl">
      <PageHeader>
        <Title>See ya</Title>
      </PageHeader>
      <Text>You are now logged out</Text>
      <Anchor component={Link} href="/">
        Go home
      </Anchor>
    </Container>
  );
}
