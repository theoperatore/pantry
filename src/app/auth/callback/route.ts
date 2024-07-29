import { NextResponse } from 'next/server';
import { createClient } from '@/db/auth';

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const error = requestUrl.searchParams.get('error');
  const errorCode = requestUrl.searchParams.get('error_code');
  const errorDescription = requestUrl.searchParams.get('error_description');
  const origin = requestUrl.origin;

  if (error) {
    console.log(
      'AUTH/CALLBACK: Error during auth callback',
      error,
      errorCode,
      errorDescription,
    );
    const params = new URLSearchParams();

    if (error === 'access_denied' || errorCode === '422') {
      params.set('error_message', errorDescription || '');
      return NextResponse.redirect(`${origin}/auth/error?${params.toString()}`);
    }

    params.set('error_message', 'Unknown auth error');
    return NextResponse.redirect(`${origin}/auth/error?${params.toString()}`);
  }

  if (code) {
    const supabase = createClient();
    const response = await supabase.auth.exchangeCodeForSession(code);

    if (response.error) {
      const params = new URLSearchParams();
      params.set('error_message', 'Failed to log in');
      return NextResponse.redirect(`${origin}/auth/error?${params.toString()}`);
    }

    requestUrl.searchParams.delete('code');

    // TODO: verify that this forward_to domain is the same as origin domain
    const forwardTo = requestUrl.searchParams.get('next') || `${origin}`;
    return NextResponse.redirect(forwardTo);
  }

  // URL to redirect to after sign up process completes
  return NextResponse.redirect(`${origin}/pantry`);
}
