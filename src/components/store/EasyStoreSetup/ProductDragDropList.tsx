
import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { GripVertical } from "lucide-react";

interface Product {
  id: string;
  name: string;
  images: string[];
}
interface ProductDragDropListProps {
  items: Product[];
  onReorder: (items: Product[]) => void;
}

const ProductDragDropList: React.FC<ProductDragDropListProps> = ({ items, onReorder }) => {
  function handleDragEnd(result: any) {
    if (!result.destination) return;
    const updated = Array.from(items);
    const [removed] = updated.splice(result.source.index, 1);
    updated.splice(result.destination.index, 0, removed);
    onReorder(updated);
  }
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <ul
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-2"
          >
            {items.map((product, idx) => (
              <Draggable key={product.id} draggableId={product.id} index={idx}>
                {(provided, snapshot) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`p-3 flex items-center bg-white rounded-lg border shadow-sm ${
                      snapshot.isDragging ? "ring-2 ring-primary" : ""
                    }`}
                  >
                    <span {...provided.dragHandleProps} className="mr-2 cursor-move">
                      <GripVertical className="w-5 h-5 text-gray-400" />
                    </span>
                    {product.images?.[0] && (
                      <img src={product.images[0]} alt={product.name} className="h-8 w-8 rounded mr-2" />
                    )}
                    <span className="font-bold">{product.name}</span>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};
export default ProductDragDropList;
