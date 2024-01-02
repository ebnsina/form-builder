import FormCard from "./FormCard";

function FormCards({ forms }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {forms?.length > 0 ? (
        forms.map((form, idx) => <FormCard key={idx} form={form} />)
      ) : (
        <p className="mt-4 text-slate-600">
          No form yet. create one to start collecting info.
        </p>
      )}
    </div>
  );
}

export default FormCards;
