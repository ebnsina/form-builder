import useDesigner from '@/context/useDesigner';
import { cn, generateId } from '@/lib/utils';
import { useDndMonitor, useDroppable } from '@dnd-kit/core';
import { FormElements } from '../forms/FormElements';
import DesignerElement from './DesignerElement';
import DesignerSidebar from './DesignerSidebar';

function Designer() {
  const {
    elements,
    addElement,
    removeElement,
    selectedElement,
    setSelectedElement,
  } = useDesigner();

  const { setNodeRef, isOver } = useDroppable({
    id: 'designer-drop-area',
    data: {
      isDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event) => {
      const { active, over } = event;
      if (!active || !over) return;

      const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;
      const isDroppingOverDesignerDropArea =
        over.data?.current?.isDesignerDropArea;

      const droppingSidebarBtnOverDesignerDropArea =
        isDesignerBtnElement && isDroppingOverDesignerDropArea;

      // 1.
      if (droppingSidebarBtnOverDesignerDropArea) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type].construct(generateId());

        return addElement(elements.length, newElement);
      }

      const isDroppingOverDesignerElementTopHalf =
        over.data?.current?.isTopHalfDesignerElement;

      const isDroppingOverDesignerElementBottomHalf =
        over.data?.current?.isBottomHalfDesignerElement;

      const isDroppingOverDesignerElement =
        isDroppingOverDesignerElementTopHalf ||
        isDroppingOverDesignerElementBottomHalf;

      const droppingSidebarBtnOverDesignerElement =
        isDesignerBtnElement && isDroppingOverDesignerElement;

      // 2.
      if (droppingSidebarBtnOverDesignerElement) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type].construct(generateId());

        const overId = over.data?.current?.elementId;

        const overElementIndex = elements.findIndex((el) => el.id === overId);
        if (overElementIndex === -1) {
          throw new Error('element not found');
        }

        let indexForNewElement = overElementIndex;
        if (isDroppingOverDesignerElementBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }

        return addElement(indexForNewElement, newElement);
      }

      // 3.
      const isDraggingDesignerElement = active.data?.current?.isDesignerElement;

      const draggingDesignerElementOverAnotherDesignerElement =
        isDroppingOverDesignerElement && isDraggingDesignerElement;

      if (draggingDesignerElementOverAnotherDesignerElement) {
        const activeId = active.data?.current?.elementId;
        const overId = over.data?.current?.elementId;

        const activeElementIndex = elements.findIndex(
          (el) => el.id === activeId
        );

        const overElementIndex = elements.findIndex((el) => el.id === overId);

        if (activeElementIndex === -1 || overElementIndex === -1) {
          throw new Error('element not found');
        }

        const activeElement = { ...elements[activeElementIndex] };
        removeElement(activeId);

        let indexForNewElement = overElementIndex;
        if (isDroppingOverDesignerElementBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }

        return addElement(indexForNewElement, activeElement);
      }
    },
  });

  return (
    <div className="flex gap-6">
      <div
        className="w-full"
        onClick={() => {
          if (selectedElement) {
            setSelectedElement(null);
          }
        }}
      >
        <div
          ref={setNodeRef}
          className={cn(
            'flex-1 p-4 bg-white shadow-sm rounded-md min-h-[90vh] overflow-hidden',
            isOver && 'ring-2 ring-indigo-300'
          )}
        >
          {elements?.length === 0 && !isOver && (
            <p className="text-slate-600 flex flex-grow items-center'">
              Drag or Click to add element.
            </p>
          )}

          {elements?.length === 0 && isOver && (
            <div className="w-full p-4">
              <div className="w-full h-36 rounded-md bg-indigo-50"></div>
            </div>
          )}

          {elements?.length > 0 && (
            <div>
              {elements.map((element) => (
                <DesignerElement key={element.id} element={element} />
              ))}
            </div>
          )}
        </div>
      </div>

      <DesignerSidebar />
    </div>
  );
}

export default Designer;
