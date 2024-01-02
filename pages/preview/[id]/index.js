import FormPreview from "@/components/forms/FormPreview";
import Layout from "@/pages/layout";
import Head from "next/head";

function FormPreviewPage() {
  return (
    <>
      <Head>
        <title>Preview Form </title>
      </Head>
      <Layout>
        <FormPreview />
      </Layout>
    </>
  );
}

export default FormPreviewPage;
