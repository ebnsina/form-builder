import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useRef, useState, useTransition } from 'react';
import { FormElements } from './FormElements';

function FormSubmit({ formUrl, formContent }) {
  const formValues = useRef({});
  const formErrors = useRef({});
  const [renderKey, setRenderKey] = useState(new Date().getTime());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const validateForm = useCallback(() => {
    for (let field of formContent) {
      const actualValue = formValues.current[field.id];
      const isValid = FormElements[field.type].validate(field, actualValue);

      if (!isValid) {
        formErrors.current[field.id] = true;
      }
    }

    if (Object.keys(formErrors.current).length > 0) {
      return false;
    }

    return true;
  }, [formContent]);

  const submitValue = useCallback((key, value) => {
    formValues.current[key] = value;
  }, []);

  const handleFormSubmit = async () => {
    formErrors.current = {};

    const isValidForm = validateForm();
    if (!isValidForm) {
      setRenderKey(new Date().getTime());
      return window.alert('Please fill all required fields');
    }

    try {
      const formData = JSON.stringify(formValues.current);

      const { data } = await axios.post('/api/forms/submit', {
        formUrl,
        values: formData,
      });

      window.alert('Form submitted successfully.');

      if (data) {
        return router.push(`/forms/${data?.form?.id}`);
      }
      setIsSubmitted(true);
    } catch (error) {
      window.alert('Failed to submit form');
      console.log(error);
    }
  };

  if (isSubmitted) {
    return (
      <div className="p-4 max-w-md mt-6">
        <h2 className="text-lg text-center mb-2">
          Form submitted successfully.
        </h2>
        <Link className="btn btn-primary" href=".">
          Check reponses.
        </Link>
      </div>
    );
  }

  return (
    <div className="flex justify-center w-full h-full items-center p-6">
      <div
        key={renderKey}
        className="max-w-[700px] flex flex-col gap-4 flex-grow w-full p-6 overflow-y-auto border rounded-md"
      >
        {formContent?.map((el) => {
          const FormElement = FormElements[el.type].formComponent;
          return (
            <FormElement
              key={el.id}
              element={el}
              submitValue={submitValue}
              isInvalid={formErrors.current[el.id]}
              defaultValue={formValues.current[el.id]}
            />
          );
        })}

        <div className="flex justify-end items-center gap-4">
          <button
            className="btn btn-primary px-8"
            disabled={isPending}
            onClick={() => startTransition(handleFormSubmit)}
          >
            {isPending ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormSubmit;
