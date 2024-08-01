import { createClient } from '@/db/auth';

export async function isUserLoggedIn() {
  const client = createClient();

  const response = await client.auth.getUser();

  if (response.data.user) return true;

  return false;
}
