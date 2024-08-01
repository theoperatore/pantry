import { Container, Text } from '@mantine/core';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function AuthError(props: Props) {
  const { searchParams } = props;
  const { error_message } = searchParams;

  return (
    <Container>
      <Text>Failed to login</Text>
      {error_message && <Text>{error_message}</Text>}
    </Container>
  );
}
