'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { createClient } from '@/db/auth';

export async function signInWithSpotify() {
  const origin = headers().get('origin');
  const client = createClient();
  const response = await client.auth.signInWithOAuth({
    provider: 'spotify',
    options: {
      redirectTo: `${origin}/auth/callback?next=${origin}/pantry/`,
      scopes: [].join(' '),
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      },
    },
  });

  if (response.data.url) {
    return redirect(response.data.url);
  }
}
