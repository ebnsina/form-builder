import axios from 'axios';
import { useTransition } from 'react';

function FormPublishButton({ id }) {
  const [isPending, startTransition] = useTransition();

  const publishForm = async () => {
    try {
      const isConfirmed = window.confirm(
        'Are you sure to publish it. This action can not be undone'
      );

      if (!isConfirmed) return;

      const { data } = await axios.post('/api/forms/publish', {
        formId: id,
      });

      if (data) {
        window.alert('Form published successfully.');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <button
        type="button"
        disabled={isPending}
        onClick={() => startTransition(publishForm)}
        className="btn btn-primary rounded-lg bg-indigo-500"
      >
        {isPending ? 'Publishing...' : 'Publish'}
      </button>
    </div>
  );
}

export default FormPublishButton;
