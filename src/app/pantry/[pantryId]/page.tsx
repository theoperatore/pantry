import { Metadata } from 'next';
import { PageHeader } from '@/design/PageHeader';
import { Container, Title } from '@mantine/core';

type Props = {
  params: {
    pantryId: string;
  };
};

export const metadata: Metadata = {
  title: 'Pantry',
};

export default function Pantry(props: Props) {
  return (
    <Container>
      <PageHeader>
        <Title>{props.params.pantryId}</Title>
      </PageHeader>
    </Container>
  );
}
