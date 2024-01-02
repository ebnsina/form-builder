import FormCreate from "@/components/forms/FormCreate";
import Layout from "../layout";
import Head from "next/head";

function CreateFormPage() {
  return (
    <>
      <Head>
        <title>Create Form </title>
      </Head>
      <Layout>
        <FormCreate />
      </Layout>
    </>
  );
}

export default CreateFormPage;
