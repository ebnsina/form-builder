import useDesigner from '@/context/useDesigner';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { MdTextFields } from 'react-icons/md';
import { z } from 'zod';

const type = 'DateField';
const label = 'Date Field';
const icon = MdTextFields;
const attributes = {
  label: 'Date field',
  helperText: 'Helper Text',
  required: false,
};

const propertiesSchema = z.object({
  label: z
    .string()
    .min(2, { message: 'Label is required.' })
    .max(50, { message: 'Label must be within 50 chars.' }),
  helperText: z
    .string()
    .max(100, { message: 'Helper text must be within 100 chars.' }),
  required: z.boolean().default(false),
});

export const DateFieldFormElement = {
  type,
  construct: (id) => ({ id, type, attributes }),
  designerButtonElement: { icon, label },
  designerComponent: DesignerComponent,
  formComponent: FormComponent,
  propertiesComponent: PropertiesComponent,
  validate: (element, currentValue) => {
    if (element.attributes.required) {
      return currentValue?.length > 0;
    }

    return true;
  },
};

// Designer Component
function DesignerComponent({ element }) {
  const { label, helperText, required } = element.attributes;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1">
        <label className="block text-sm text-slate-600" htmlFor="label">
          {label}
        </label>
        {required && (
          <span className="text-red-500 text-xs block">Required</span>
        )}
      </div>

      <button type="button" className="btn btn-primary rounded-md">
        Pick a date
      </button>

      {helperText && (
        <span className="text-slate-600 text-xs block mt-1">{helperText}</span>
      )}
    </div>
  );
}

// Form Component
function FormComponent({ element, submitValue, isInvalid, defaultValue }) {
  const [value, setValue] = useState(
    defaultValue ? new Date(defaultValue) : undefined
  );
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(isInvalid === true);
  }, [isInvalid]);

  const { label, helperText, required } = element?.attributes;

  return (
    <div className="px-2 mb-3">
      <div className="flex justify-between items-center mb-1">
        <label className="block text-sm text-slate-600" htmlFor="">
          {label}
        </label>
        {required && (
          <span className="text-red-500 text-xs block">Required</span>
        )}
      </div>

      <div>
        <button
          className={cn(
            !value && 'text-slate-600',
            hasError && 'border-red-500'
          )}
        >
          {value ? format(value, 'PPP') : 'Pick a date'}
        </button>

        <input
          className={cn(
            'w-full border-slate-300 rounded-lg',
            hasError && 'border-red-500'
          )}
          type="date"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={(e) => {
            const value = e.target.value;
            if (!submitValue) return;

            // const value = e.target.value?.toUTCString() || '';
            const isValid = DateFieldFormElement.validate(element, value);
            setHasError(!isValid);

            if (!isValid) return;
            submitValue(element.id, value);
          }}
        />
      </div>

      {helperText && (
        <span className="text-slate-600 text-sm block mt-1">{helperText}</span>
      )}
    </div>
  );
}

// Properties Component
function PropertiesComponent({ element }) {
  const { updateElement } = useDesigner();

  const { handleSubmit, reset, control } = useForm({
    resolver: zodResolver(propertiesSchema),
    mode: 'onBlur',
    defaultValues: {
      label: element.attributes.label,
      helperText: element.attributes.helperText,
      required: element.attributes.required,
    },
  });

  useEffect(() => {
    reset(element.attributes);
  }, [element, reset]);

  const onSubmit = (values) => {
    updateElement(element.id, {
      ...element,
      attributes: {
        label: values.label,
        placeholder: values.placeholder,
        helperText: values.helperText,
        required: values.required,
      },
    });
  };

  return (
    <div>
      <form
        onBlur={handleSubmit(onSubmit)}
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="mb-3">
          <label className="block text-sm text-slate-600 mb-1" htmlFor="label">
            Label
          </label>

          <Controller
            control={control}
            name="label"
            render={({ field }) => (
              <input
                {...field}
                className="w-full border-slate-400 rounded-md"
                type="text"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') e.currentTarget.blur();
                }}
              />
            )}
          />

          <span className="block text-xs text-slate-600 mt-2">
            The label for field. This will display above the field.
          </span>
        </div>
        <div className="mb-3">
          <label
            className="block text-sm text-slate-600 mb-1"
            htmlFor="placeholder"
          >
            Placeholder
          </label>

          <Controller
            control={control}
            name="placeholder"
            render={({ field }) => (
              <input
                {...field}
                className="w-full border-slate-400 rounded-md"
                type="text"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') e.currentTarget.blur();
                }}
              />
            )}
          />
          <span className="block text-xs text-slate-600 mt-2">
            The placeholder for field. This will display in the field.
          </span>
        </div>
        <div className="mb-3">
          <label
            className="block text-sm text-slate-600 mb-1"
            htmlFor="heplerText"
          >
            Helper Text
          </label>
          <Controller
            control={control}
            name="helperText"
            render={({ field }) => (
              <input
                {...field}
                className="w-full border-slate-400 rounded-md"
                type="text"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') e.currentTarget.blur();
                }}
              />
            )}
          />

          <span className="block text-xs text-slate-600 mt-2">
            The placeholder for field. This will display below the field.
          </span>
        </div>
        <div className="mb-3">
          <Controller
            control={control}
            name="required"
            render={({ field }) => (
              <label
                className="flex space-x-2 text-sm text-slate-600"
                htmlFor="heplerText"
              >
                <input
                  id="heplerText"
                  className="rounded-sm"
                  type="checkbox"
                  checked={field.value}
                  onChange={field.onChange}
                  {...field}
                />
                <span>Required</span>
              </label>
            )}
          />

          <span className="block text-xs text-slate-600 mt-2">
            The defines if field should required or not.
          </span>
        </div>
      </form>
    </div>
  );
}
