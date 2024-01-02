import FormSubmissionTable from "@/components/forms/FormSubmissionTable";
import ShareInfo from "@/components/forms/ShareInfo";
import StatCard from "@/components/forms/StatCard";
import { getFormById } from "@/lib/forms";
import { USER_ID } from "@/lib/user";
import prisma from "@/prisma/prismaClient";
import Head from "next/head";
import Link from "next/link";

function FormDetailsPage({ form, formWithSubmission }) {
  const { visits, submissions } = form;
  const submissionRate = visits ? (submissions / visits) * 100 : 0;
  const bounceRate = 100 - submissionRate ?? 0;

  return (
    <>
      <Head>
        <title>Form Detail</title>
      </Head>
      <div className="container mx-auto mt-6 min-h-[95vh] rounded-lg bg-white p-4">
        <div className="flex items-center justify-between">
          <ul className="flex items-center space-x-3">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>/</li>
            <li>
              <h3>{form?.name}</h3>
            </li>
          </ul>

          <ShareInfo shareUrl={form?.shareUrl} />
        </div>

        <hr className="my-4" />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            className="border border-slate-300"
            title="Total visits"
            helperText="Total number of visits to your form"
            value={form?.visits ?? 0}
          />
          <StatCard
            className="border border-slate-300"
            title="Total Submissions"
            helperText="Total number of submissions to your form"
            value={form?.submissions ?? 0}
          />
          <StatCard
            className="border border-slate-300"
            title="Total Submissions Rate"
            helperText="Total number of submissions to your form"
            value={`${submissionRate.toFixed(2)}%`}
          />
          <StatCard
            className="border border-slate-300"
            title="Total Bounce Rate"
            helperText="Total number of bounces to your form"
            value={`${bounceRate.toFixed(2)}%`}
          />
        </div>

        <hr className="my-6" />

        <FormSubmissionTable form={formWithSubmission} formId={form?.id} />
      </div>
    </>
  );
}

export default FormDetailsPage;

export async function getServerSideProps(context) {
  const id = context.params.id;
  const form = await getFormById(USER_ID, +id);

  // Get form submissions data.
  const formWithSubmission = await prisma.form.findUnique({
    where: { userId: String(USER_ID), id: +id },
    include: { formSubmission: true },
  });

  return {
    props: {
      form: JSON.parse(JSON.stringify(form)),
      formWithSubmission: JSON.parse(JSON.stringify(formWithSubmission)),
    },
  };
}
