import { getForms } from '@/lib/forms';
import { USER_ID } from '@/lib/user';

export default async function handler(req, res) {
  const forms = await getForms(USER_ID);
  res.status(200).json(forms);
}
