import { Metadata } from 'next';
import { PageHeader } from '@/design/PageHeader';
import { Button, Container, Title } from '@mantine/core';

export const metadata: Metadata = {
  title: 'Pantry - List',
};

export default async function PantryList() {
  // look up the user's most recent pantry

  return (
    <Container>
      <PageHeader>
        <Title>Your pantries</Title>
      </PageHeader>
      <Button>Build a new pantry</Button>
    </Container>
  );
}
