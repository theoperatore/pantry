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
import { IconTrash } from '@tabler/icons-react';
import { allIcons } from './foods';
import { FoodIconFreshness } from './foods/FoodIconFreshness';

export default function Home() {
  return (
    <Container>
      <Group py="md">
        <Title>Pantry</Title>
      </Group>
      <Text pb="md">
        Some stuff describing some things. When you have a paragraph of text and
        you want to determine if this font is nice or not.
      </Text>
      <Group gap="sm" mb="md">
        <Button>Primary Button</Button>
        <Button color="danger" leftSection={<IconTrash size={16} />}>
          Danger
        </Button>
        <Button color="freshness">Freshness</Button>
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
