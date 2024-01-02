import useDesigner from '@/context/useDesigner';
import { DragOverlay, useDndMonitor } from '@dnd-kit/core';
import { useState } from 'react';
import { FormElements } from '../forms/FormElements';
import { SidebarButtonElementDragOverlay } from './SidebarButtonElement';

function DragOverlayWrapper() {
  const [draggedItem, setDraggedItem] = useState(null);
  const { elements } = useDesigner();

  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });

  if (!draggedItem) return null;

  let node = (
    <div className="text-center text-slate-600 text-sm">No drag overlay.</div>
  );

  const isSidebarBtnElement =
    draggedItem?.data?.current?.isDesignerButtonElement;
  if (isSidebarBtnElement) {
    const type = draggedItem?.data?.current?.type;
    node = <SidebarButtonElementDragOverlay formElement={FormElements[type]} />;
  }

  const isDesignerElement = draggedItem?.data?.current?.isDesignerElement;
  if (isDesignerElement) {
    const elementId = draggedItem?.data?.current?.elementId;
    const element = elements.find((element) => element.id === elementId);
    if (!element) return <div>Element not found.</div>;

    const DesignerElementComponent =
      FormElements[element.type].designerComponent;
    node = (
      <div className="flex border-2 border-dashed border-indigo-400 rounded-md h-32 w-full px-4 py-2 opacity-70 pointer-events-none">
        <DesignerElementComponent element={element} />
      </div>
    );
  }

  return <DragOverlay>{node}</DragOverlay>;
}

export default DragOverlayWrapper;
