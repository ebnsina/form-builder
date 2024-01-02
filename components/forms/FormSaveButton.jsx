import useDesigner from '@/context/useDesigner';
import axios from 'axios';
import { useTransition } from 'react';

function FormSaveButton({ id }) {
  const { elements } = useDesigner();
  const [isPending, startTransition] = useTransition();

  const saveFormContent = async () => {
    try {
      const { data } = await axios.post(`/api/forms/save`, {
        formId: id,
        formContent: JSON.stringify(elements),
      });

      if (data) {
        window.alert('Form saved successfully.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button
        className="btn btn-primary rounded-lg bg-slate-400"
        disabled={isPending}
        onClick={() => startTransition(saveFormContent)}
      >
        {isPending ? 'Saving' : 'Save'}
      </button>
    </div>
  );
}

export default FormSaveButton;
