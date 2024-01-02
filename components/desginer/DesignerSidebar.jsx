import useDesigner from '@/context/useDesigner';
import FormElementSidebar from '../forms/FormElementSidebar';
import FormPropertySidebar from '../forms/FormPropertySidebar';

function DesignerSidebar() {
  const { selectedElement } = useDesigner();

  return (
    <aside className="bg-white p-4 shadow-sm rounded-md min-h-[90vh] overflow-hidden w-[600px]">
      <h4 className="text-base font-medium mb-2 text-center text-slate-600">
        Form Elements
      </h4>

      <hr />

      <div className="py-4">
        {!selectedElement ? <FormElementSidebar /> : <FormPropertySidebar />}
      </div>
    </aside>
  );
}

export default DesignerSidebar;
