import { formSchema } from '@/lib/forms';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

function FormCreate() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const router = useRouter();

  const onSubmit = async (values) => {
    try {
      const { data } = await axios.post('/api/forms/create', {
        name: values.name,
        description: values.description,
      });

      const formId = data?.formId;
      router.push(`/builder/${formId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-4 rounded-xl">
      <div className="mb-6 text-center">
        <h3 className="text-lg font-medium mb-2">Create new form.</h3>
        <p className="text-slate-600 text-sm">
          create a new form to start collecting responses.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="block text-sm mb-1 text-slate-600" htmlFor="name">
            Name
          </label>
          <input
            {...register('name')}
            name="name"
            id="name"
            placeholder="Personal"
            className="w-full border-slate-600 rounded-md"
          />

          {errors.title && <span>{errors.title.message}</span>}
        </div>
        <div className="mb-3">
          <label
            className="block text-sm mb-1 text-slate-600"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            {...register('description')}
            name="description"
            id="description"
            rows={3}
            placeholder="Form description goes here..."
            className="w-full border-slate-600 rounded-md"
          ></textarea>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <Link href="/" className="btn btn-ghost px-8">
            Cancel
          </Link>
          <button type="submit" className="btn btn-primary px-8">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default FormCreate;
