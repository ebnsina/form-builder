import FormSubmit from "@/components/forms/FormSubmit";
import { getFormByUrl } from "@/lib/forms";
import { USER_ID } from "@/lib/user";
import Head from "next/head";

function SubmitDetailPage({ form, formUrl }) {
  const formContent = JSON.parse(form?.content);

  return (
    <>
      <Head>
        <title>Submit Form </title>
      </Head>
      <div className="mt-6">
        <div className="container mx-auto min-h-[95vh] rounded-md bg-white p-4">
          <h2 className="mb-6 text-center text-xl text-slate-700">
            Submit your form.
          </h2>

          <FormSubmit formUrl={formUrl} formContent={formContent} />
        </div>
      </div>
    </>
  );
}

export default SubmitDetailPage;

export async function getServerSideProps(context) {
  const { formUrl } = context.params;
  const form = await getFormByUrl(USER_ID, formUrl);

  return {
    props: {
      formUrl,
      form: JSON.parse(JSON.stringify(form)),
    },
  };
}
