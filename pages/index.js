import StatCards from '@/components/forms/StatCards';
import { getFormStats } from '@/lib/forms';
import { USER_ID } from '@/lib/user';
import Head from 'next/head';
import Link from 'next/link';
import Layout from './layout';

export default function HomePage({ stats }) {
  return (
    <>
      <Head>
        <title>Form Builder</title>
      </Head>

      <Layout>
        <div className="container mx-auto">
          <header className="my-4 rounded-2xl bg-slate-200 px-16 py-32 text-slate-700">
            <h2 className="mb-2 text-3xl font-semibold">Welcome.</h2>
            <p>
              Here you can create, edit, submit and share your forms with
              others.
            </p>

            <Link href="/create" className="btn btn-primary mt-8 px-8">
              Create Form
            </Link>
          </header>

          <div className="mb-4">
            <StatCards stats={stats} />
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getServerSideProps() {
  const stats = await getFormStats(USER_ID);

  return {
    props: { stats },
  };
}
