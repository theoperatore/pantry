import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { isUserLoggedIn } from '@/api/auth/isUserLoggedIn';
import { signInWithSpotify } from '@/api/auth/signInWithSpotify';
import { Button, Container, Paper, Stack, Title, rem } from '@mantine/core';
import { IconBrandSpotifyFilled } from '@tabler/icons-react';

type Props = {
  searchParams: {
    register?: boolean;
  };
};

export const metadata: Metadata = {
  title: 'Pantry - Login',
};

export default async function Login(_props: Props) {
  const isLoggedIn = await isUserLoggedIn();

  if (isLoggedIn) {
    redirect('/pantry');
  }

  return (
    <Container maw={rem(420)} p="lg">
      <Paper p="lg" radius="md" withBorder>
        <Title>Log in</Title>

        <form>
          <Stack pt="lg">
            <Button
              leftSection={<IconBrandSpotifyFilled />}
              type="submit"
              variant="default"
              radius="md"
              formAction={signInWithSpotify}
            >
              Spotify
            </Button>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
}
