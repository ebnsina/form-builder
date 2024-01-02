import { getUser } from '@/lib/user';

export default async function handler(req, res) {
  const user = await getUser();
  res.status(200).json(user);
}
