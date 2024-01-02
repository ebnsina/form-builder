import FormBuilder from '@/components/forms/FormBuilder';
import { getFormById } from '@/lib/forms';
import { USER_ID } from '@/lib/user';
import Layout from '@/pages/layout';
import Head from 'next/head';

function BuilderPage({ form }) {
  return (
    <>
      <Head>
        <title>From Builder</title>
      </Head>
      <Layout>
        <FormBuilder form={form} />
      </Layout>
    </>
  );
}

export default BuilderPage;

export async function getServerSideProps(context) {
  const id = context.params.id;
  const form = await getFormById(USER_ID, +id);

  return {
    props: {
      form: JSON.parse(JSON.stringify(form)),
    },
  };
}
