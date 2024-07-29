import { PropsWithChildren } from 'react';
import Link from 'next/link';
import { getUser } from '@/api/auth/getUser';
import {
  Avatar,
  Group,
  Menu,
  MenuDropdown,
  MenuItem,
  MenuLabel,
  MenuTarget,
  UnstyledButton,
} from '@mantine/core';

export async function PageHeader(props: PropsWithChildren<{}>) {
  const user = await getUser();

  const name =
    user.data.user?.user_metadata.name || user.data.user?.email || '';
  const firstLetter = name.charAt(0);

  const isSignedIn = !!user.data.user;

  return (
    <Group py="md" justify="space-between">
      <Group>{props.children}</Group>
      {isSignedIn && (
        <Menu width={200} position="bottom-end">
          <MenuTarget>
            <Avatar component={UnstyledButton} radius="xl">
              {firstLetter}
            </Avatar>
          </MenuTarget>
          <MenuDropdown>
            <MenuLabel>{name}</MenuLabel>
            <MenuItem component={Link} href="/logout">
              Logout
            </MenuItem>
          </MenuDropdown>
        </Menu>
      )}
    </Group>
  );
}
