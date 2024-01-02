import { createContext, useState } from 'react';

export const DesignerContext = createContext(null);

function DesignerContextProvider({ children }) {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null);

  const addElement = (index, element) => {
    setElements((prev) => {
      const newElement = [...prev];
      newElement.splice(index, 0, element);
      return newElement;
    });
  };

  const removeElement = (id) => {
    setElements((prev) => prev.filter((element) => element.id !== id));
  };

  const updateElement = (id, element) => {
    setElements((prev) => {
      const newElement = [...prev];
      const index = newElement.findIndex((element) => element.id === id);
      newElement[index] = element;
      return newElement;
    });
  };

  const value = {
    elements,
    addElement,
    setElements,
    removeElement,
    selectedElement,
    setSelectedElement,
    updateElement,
  };

  return (
    <DesignerContext.Provider value={value}>
      {children}
    </DesignerContext.Provider>
  );
}

export default DesignerContextProvider;
