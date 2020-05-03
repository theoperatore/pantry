import { NextApiRequest } from 'next';

export function parseToken(req: NextApiRequest): string {
  const auth = req.headers.authorization;

  if (!auth) {
    return '';
  }

  return auth.replace(/^token\s/, '');
}
