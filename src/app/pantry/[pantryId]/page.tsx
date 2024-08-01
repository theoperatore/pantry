import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getUser } from '@/api/auth/getUser';
import { getPantryAndItemsForUser } from '@/api/pantry/getPantryAndItemsForUser';
import { QuantityTypeEnum } from '@/db/types';
import { PageHeader } from '@/design/PageHeader';
import { allIcons } from '@/foods';
import { FoodIconFreshness } from '@/foods/FoodIconFreshness';
import {
  Container,
  Flex,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { differenceInSeconds } from 'date-fns';
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';

type Props = {
  params: {
    pantryId: string;
  };
};

export const metadata: Metadata = {
  title: 'Pantry',
};

export default async function Pantry(props: Props) {
  const { data } = await getUser();

  if (!data.user) {
    redirect('/login');
  }

  const pantry = await getPantryAndItemsForUser(
    props.params.pantryId,
    data.user.id,
  );

  if (!pantry) {
    redirect('/pantry');
  }

  return (
    <Container>
      <PageHeader>
        <Title>{pantry.pantry_name}</Title>
      </PageHeader>
      {pantry.pantry_items.length === 0 && <Text>Stock a pantry item</Text>}
      {pantry.pantry_items.map(item => {
        const icon = allIcons.find(i => i.id === item.icon_id);
        return (
          <Paper
            key={item.id}
            withBorder
            radius="md"
            shadow="md"
            p="sm"
            mb="sm"
            mt="md"
          >
            <Group justify="space-between">
              <Group align="center">
                {icon && <icon.icon />}
                <Stack gap="xs">
                  <Text fw="bolder">{item.pantry_item_name}</Text>
                  {item.quantity && (
                    <Text fz="xs">
                      Stocked {formatDistanceToNow(item.quantity.stocked_at)}
                    </Text>
                  )}
                </Stack>
              </Group>
              {item.quantity && (
                <Group align="center">
                  <Stack gap="xs" align="flex-end">
                    <Quantity
                      quantity={item.quantity.quantity}
                      quantity_type={item.quantity_type}
                    />
                    <Freshness
                      stocked_at={item.quantity.stocked_at}
                      expires_at={item.quantity.expires_at}
                    />
                  </Stack>
                </Group>
              )}
            </Group>
          </Paper>
        );
      })}
    </Container>
  );
}

type QuantityProps = {
  quantity: number;
  quantity_type: QuantityTypeEnum;
};

function Quantity(props: QuantityProps) {
  let qt = 'pcs';

  switch (props.quantity_type) {
    case 'RANGE':
      qt = '%';
      break;
    case 'UNIT':
      qt = 'pcs';
      break;
  }

  return (
    <Text>
      {props.quantity}
      {qt}
    </Text>
  );
}

type FreshnessProps = {
  stocked_at: string;
  expires_at: string;
};

function Freshness(props: FreshnessProps) {
  const now = Date.now();
  const totalTime = differenceInSeconds(props.expires_at, props.stocked_at);
  const nowToEnd = differenceInSeconds(props.expires_at, now);
  const ratio = nowToEnd / totalTime;

  const is20Fresh = 0 < ratio && ratio >= 0.2;
  const is40Fresh = 0.21 < ratio && ratio >= 0.4;
  const is60Fresh = 0.41 < ratio && ratio >= 0.6;
  const is80Fresh = 0.61 < ratio && ratio >= 0.8;
  const is100Fresh = ratio >= 0.81;

  return (
    <Flex align="center" gap="xs">
      <FoodIconFreshness style={{ opacity: is20Fresh ? 1 : 0.2 }} size="sm" />
      <FoodIconFreshness style={{ opacity: is40Fresh ? 1 : 0.2 }} size="sm" />
      <FoodIconFreshness style={{ opacity: is60Fresh ? 1 : 0.2 }} size="sm" />
      <FoodIconFreshness style={{ opacity: is80Fresh ? 1 : 0.2 }} size="sm" />
      <FoodIconFreshness style={{ opacity: is100Fresh ? 1 : 0.2 }} size="sm" />
    </Flex>
  );
}
