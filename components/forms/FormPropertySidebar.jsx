import useDesigner from '@/context/useDesigner';
import { BiArchiveOut } from 'react-icons/bi';
import { FormElements } from './FormElements';

function FormPropertySidebar() {
  const { selectedElement, setSelectedElement } = useDesigner();
  if (!selectedElement) return null;

  const PropertiesForm = FormElements[selectedElement.type].propertiesComponent;

  return (
    <div className="flex flex-col p-2">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-sm text-slate-600">Element Properties</h4>
        <button onClick={() => setSelectedElement(null)}>
          <BiArchiveOut />
        </button>
      </div>

      <PropertiesForm element={selectedElement} />
    </div>
  );
}

export default FormPropertySidebar;
