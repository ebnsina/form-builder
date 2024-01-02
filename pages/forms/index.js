import FormCards from '@/components/forms/FormCards';
import { getForms } from '@/lib/forms';
import { USER_ID } from '@/lib/user';
import Head from 'next/head';
import Layout from '../layout';

function FormPage({ forms }) {
  return (
    <>
      <Head>
        <title>Form Page</title>
      </Head>

      <Layout>
        <div className="my-6">
          <div>
            <h4 className="text-2xl font-semibold mb-6 text-slate-700">
              All of your forms.
            </h4>
          </div>

          <FormCards forms={forms} />
        </div>
      </Layout>
    </>
  );
}

export default FormPage;

export async function getServerSideProps() {
  const forms = await getForms(USER_ID);

  return {
    props: {
      forms: JSON.parse(JSON.stringify(forms)),
    },
  };
}
