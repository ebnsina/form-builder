import useDesigner from '@/context/useDesigner';
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Designer from '../desginer/Designer';
import DragOverlayWrapper from '../desginer/DragOverlayWrapper';
import FormPreviewButton from './FormPreviewButton';
import FormPublishButton from './FormPublishButton';
import FormSaveButton from './FormSaveButton';

function FormBuilder({ form }) {
  const { setElements, setSelectedElement } = useDesigner();
  const [isReady, setIsReady] = useState(false);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: { distance: 10 },
  });

  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: { delay: 250, tolerance: 5 },
  });

  const sensorConfig = useSensors(mouseSensor, touchSensor);

  useEffect(() => {
    if (!isReady) return setIsReady(true);

    setElements(JSON.parse(form.content));
    setSelectedElement(null);
  }, [form, isReady, setElements, setSelectedElement]);

  if (!isReady) {
    return <p className="text-slate-600 text-center my-6">Loading...</p>;
  }

  return (
    <DndContext sensors={sensorConfig}>
      <main>
        <header className="flex justify-between items-center px-4 py-2">
          <nav>
            <ul className="flex space-x-3">
              <li>
                <Link className="underline" href="/">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>{form?.name}</li>
            </ul>
          </nav>

          <div className="flex space-x-3">
            <FormPreviewButton />

            {!form.published && (
              <>
                <FormSaveButton id={form.id} />
                <FormPublishButton id={form.id} />
              </>
            )}
          </div>
        </header>

        <Designer />
        <DragOverlayWrapper />
      </main>
    </DndContext>
  );
}

export default FormBuilder;
