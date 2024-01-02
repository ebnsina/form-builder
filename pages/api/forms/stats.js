import { getFormStats } from '@/lib/forms';
import { USER_ID } from '@/lib/user';

export default async function handler(req, res) {
  const { visits, submissions, submissionRate, bounceRate } =
    await getFormStats(USER_ID);

  res.status(200).json({ visits, submissions, submissionRate, bounceRate });
}
