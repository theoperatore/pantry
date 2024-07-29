import { createClient } from '@/db/auth';

export async function getUser() {
  const client = createClient();
  return client.auth.getUser();
}
