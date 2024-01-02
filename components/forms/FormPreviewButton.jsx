import useDesigner from '@/context/useDesigner';
import * as Dialog from '@radix-ui/react-dialog';
import { FormElements } from './FormElements';

function FormPreviewButton() {
  const { elements } = useDesigner();

  console.log('Form Preview', elements);

  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button className="btn btn-primary rounded-lg">Preview</button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed left-[50%] top-[50%] mt-8 max-h-[90vh] w-[90vw] max-w-[650px] translate-x-[-50%] translate-y-[-50%] overflow-y-scroll rounded-lg bg-white p-6 focus:outline-none">
            <Dialog.Title className="mb-2 text-xl text-slate-600">
              Form Preview
            </Dialog.Title>
            <Dialog.Description className="mb-2 text-sm text-slate-600">
              This is how your form will look like to your users.
            </Dialog.Description>

            <div className="mt-8">
              {elements.map((element) => {
                const FormComponent = FormElements[element.type].formComponent;
                return <FormComponent key={element.id} element={element} />;
              })}
            </div>

            <div className="mt-6">
              <Dialog.Close asChild>
                <button className="btn btn-primary" aria-label="Close">
                  Close
                </button>
              </Dialog.Close>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

export default FormPreviewButton;
