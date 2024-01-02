import useDesigner from '@/context/useDesigner';
import { cn } from '@/lib/utils';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { useState } from 'react';
import { BiTrashAlt } from 'react-icons/bi';
import { FormElements } from '../forms/FormElements';

function DesignerElement({ element }) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const { removeElement, selectedElement, setSelectedElement } = useDesigner();

  const DesignerElement = FormElements[element.type].designerComponent;

  const topHalf = useDroppable({
    id: `${element.id}-top`,
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });

  const bottomHalf = useDroppable({
    id: `${element.id}-bottom`,
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  });

  const draggable = useDraggable({
    id: `${element.id}-drag-handler`,
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });

  if (draggable.isDragging) return null;

  return (
    <div>
      <div
        ref={draggable.setNodeRef}
        {...draggable.attributes}
        {...draggable.listeners}
        className="relative mb-3 h-32 flex flex-col text-slate-600 rounded-md ring-1 ring-slate-300 ring-inset hover:cursor-pointer"
        onMouseEnter={() => setMouseIsOver(true)}
        onMouseLeave={() => setMouseIsOver(false)}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedElement(element);
        }}
      >
        <div
          ref={topHalf.setNodeRef}
          className={cn('absolute w-full h-1/2 rounded-t-md')}
        />
        <div
          ref={bottomHalf.setNodeRef}
          className={cn('absolute w-full bottom-0 h-1/2 rounded-b-md')}
        />

        {mouseIsOver && (
          <>
            <div className="absolute right-0 h-full">
              <button
                className="flex justify-end items-center w-full h-full rounded-l-none rounded-r-md"
                onClick={(e) => {
                  e.stopPropagation();
                  removeElement(element.id);
                }}
              >
                <BiTrashAlt size={20} />
              </button>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <p className="text-sm text-slate-600">
                Click for properties or drag to move.
              </p>
            </div>
          </>
        )}

        {topHalf.isOver && (
          <div className="absolute top-0 w-full rounded-md h-1 bg-red-400 rounded-b-none" />
        )}

        {bottomHalf.isOver && (
          <div className="absolute bottom-0 w-full rounded-md h-1 bg-yellow-400 rounded-t-none" />
        )}

        <div
          className={cn(
            'flex w-full h-32 items-center rounded-md px-4 py-2 pointer-events-none opacity-100',
            mouseIsOver && 'opacity-10'
          )}
        >
          <DesignerElement element={element} />
        </div>
      </div>
    </div>
  );
}

export default DesignerElement;
