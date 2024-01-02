import { cn } from '@/lib/utils';
import { useDraggable } from '@dnd-kit/core';

function SidebarButtonElement({ formElement }) {
  const { icon: Icon, label } = formElement.designerButtonElement;

  const { setNodeRef, listeners, attributes, isDragging } = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerBtnElement: true,
    },
  });

  return (
    <button
      ref={setNodeRef}
      className={cn(
        'w-full flex space-x-2 items-center bg-slate-100 px-4 py-2 rounded-lg',
        isDragging && 'ring-2 ring-primary'
      )}
      {...listeners}
      {...attributes}
    >
      <Icon />
      <span>{label}</span>
    </button>
  );
}

export function SidebarButtonElementDragOverlay({ formElement }) {
  const { icon: Icon, label } = formElement.designerButtonElement;

  return (
    <button className={cn('btn btn-primary flex space-x-2 items-center')}>
      <Icon />
      <span>{label}</span>
    </button>
  );
}

export default SidebarButtonElement;
