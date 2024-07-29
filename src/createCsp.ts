import builder from 'content-security-policy-builder';

const isDev = process.env.NODE_ENV !== 'production';

export function createCsp({ nonce }: { nonce: string }) {
  return builder({
    directives: {
      'object-src': ["'none'"],
      'script-src': [
        // "'self'",
        `'nonce-${nonce}'`,
        "'strict-dynamic'",
        // "'unsafe-inline'",
        // 'https:',
        // next.js uses eval for sourcemaps in dev
        ...(isDev ? ["'unsafe-eval'"] : []),
      ],
      // 'style-src': ['self', `nonce-${nonce}`],
      'img-src': ["'self'", 'blob:', 'data:'],
      'font-src': ["'self'"],
      'base-uri': ["'self'"],
      'form-action': ["'self'"],
      'frame-ancestors': ["'none'"],
      'upgrade-insecure-requests': [],
    },
  });
}
