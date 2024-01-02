import { formatDistance } from 'date-fns';
import Link from 'next/link';

function FormCard({ form }) {
  return (
    <article className="flex flex-col justify-between rounded-2xl bg-white px-8 py-10">
      <div className="mb-4 flex items-center  justify-between">
        <div className="flex space-x-3">
          <h2 className="text-xl font-medium">{form?.name}</h2>

          <div>
            {form?.published ? (
              <span className="inline-block rounded-full bg-indigo-400 px-4 py-1 text-xs uppercase tracking-wider text-white">
                Published
              </span>
            ) : (
              <span className="inline-block rounded-full bg-slate-300 px-4 py-1 text-xs uppercase tracking-wider">
                Draft
              </span>
            )}
          </div>
        </div>

        <div className="text-xs text-slate-700">
          {formatDistance(new Date(form?.createdAt), new Date(), {
            addSuffix: true,
          })}
        </div>
      </div>

      <div>
        <p className="truncate text-sm text-slate-600">{form?.description}</p>
      </div>

      <div className="flex justify-between items-center mt-6">
        <div>
          {!form?.published && (
            <div className="flex items-center space-x-4">
              <span>Visits: {form?.visits}</span>
              <span>Submissions: {form?.submissions}</span>
            </div>
          )}
        </div>

        <div>
          {form?.published ? (
            <Link className="btn btn-primary px-6" href={`/forms/${form?.id}`}>
              View
            </Link>
          ) : (
            <Link
              className="btn btn-primary px-6"
              href={`/builder/${form?.id}`}
            >
              Edit
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

export default FormCard;
