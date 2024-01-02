import SidebarButtonElement from '../desginer/SidebarButtonElement';
import { FormElements } from './FormElements';

function FormElementSidebar() {
  return (
    <div>
      <div>
        <h2 className="text-slate-700 text-sm mb-2">Fields</h2>

        <div className="space-y-2">
          <SidebarButtonElement formElement={FormElements.TextField} />
          <SidebarButtonElement formElement={FormElements.TextAreaField} />
          <SidebarButtonElement formElement={FormElements.NumberField} />
          <SidebarButtonElement formElement={FormElements.DateField} />
          <SidebarButtonElement formElement={FormElements.SelectField} />
          <SidebarButtonElement formElement={FormElements.CheckboxField} />
        </div>
      </div>
    </div>
  );
}

export default FormElementSidebar;
