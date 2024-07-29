import { Metadata } from 'next';
import Link from 'next/link';
import { PageHeader } from '@/design/PageHeader';
import {
  ActionIcon,
  Button,
  Container,
  Flex,
  Group,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { allIcons } from './foods';
import { FoodIconFreshness } from './foods/FoodIconFreshness';

export const metadata: Metadata = {
  title: 'Pantry - Home',
};

export default async function Home() {
  return (
    <Container>
      <PageHeader>
        <Title>Pantry</Title>
      </PageHeader>
      <Text pb="md">
        {`Keep track of what's in your pantry so that the next time you go shopping you know exactly what to replace or stock up on`}
      </Text>
      <Group gap="sm" mb="md">
        <Button component={Link} href="/login">
          Stock your pantry
        </Button>
      </Group>
      <Group gap="sm" mb="md">
        {allIcons.map((Icon, idx) => (
          <ActionIcon key={`foodIcon-${idx}`} size={64} variant="subtle">
            <Icon />
          </ActionIcon>
        ))}
      </Group>
      <Stack gap="xs">
        <Flex align="center" gap="xs">
          <FoodIconFreshness size="sm" />
          <FoodIconFreshness size="sm" />
          <FoodIconFreshness size="sm" />
          <FoodIconFreshness style={{ opacity: 0.2 }} size="sm" />
          <FoodIconFreshness style={{ opacity: 0.2 }} size="sm" />
        </Flex>
        <Text c="gray" size="xs">
          Freshness
        </Text>
      </Stack>
    </Container>
  );
}
