import { format, formatDistance } from 'date-fns';

function FormSubmissionTable({ form }) {
  const formElements = JSON.parse(form?.content);

  const columns = [];
  formElements?.forEach((element) => {
    switch (element.type) {
      case 'TextField':
      case 'NumberField':
      case 'TextAreaField':
      case 'DateField':
      case 'SelectField':
      case 'CheckboxField':
        columns.push({
          id: element.id,
          label: element.attributes?.label,
          required: element.attributes?.required,
          type: element.type,
        });
        break;
      default:
        break;
    }
  });

  const rows = [];
  form?.formSubmission.forEach((submission) => {
    const content = JSON.parse(submission.content);
    rows.push({
      ...content,
      submittedAt: submission.createdAt,
    });
  });

  return (
    <div>
      <h2 className="text-slate-600 mb-2">Submissions</h2>

      <table className="w-full">
        <thead className="flex w-full">
          {columns.map((column, idx) => (
            <tr key={idx}>
              <th className="px-4 py-2">{column.label}</th>
            </tr>
          ))}
          <th className="px-4 py-2">Submitted at</th>
        </thead>

        <tbody className="w-full">
          {rows.map((row, i) => (
            <tr className="w-full" key={i}>
              {columns.map((c) => (
                <RowCell key={c.id} type={c.type} value={row[c.id]} />
              ))}
              <td className="px-4 py-2">
                <span className='className="text-xs text-slate-600 inline-block"'>
                  {formatDistance(new Date(row.submittedAt), new Date(), {
                    addSuffix: true,
                  })}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RowCell({ type, value }) {
  let node = value;

  switch (type) {
    case 'DateField':
      if (!value) break;
      const date = new Date(value);
      node = (
        <span className="text-xs text-slate-600 inline-block">
          {format(date, 'dd/MM/yyyy')}
        </span>
      );
      break;
    case 'CheckboxField':
      const checked = value === 'true';
      node = (
        <label>
          <input className="rounded-md" checked={checked} disabled />
        </label>
      );
      break;
  }

  return <td className="px-4 py-2">{node}</td>;
}

export default FormSubmissionTable;
