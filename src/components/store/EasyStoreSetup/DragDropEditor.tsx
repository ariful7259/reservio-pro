// Replacing most code to accept products prop & handle drag and drop
import React, { useState } from "react";
import { ProductDragDropList } from ".";
// ... keep rest of your business logic the same; assume Product[] type ...

interface DragDropEditorProps {
  storeName: string;
  products?: { id: string; name: string; images: string[] }[];
}

const DragDropEditor: React.FC<DragDropEditorProps> = ({ storeName, products: initialProducts }) => {
  const [products, setProducts] = useState(initialProducts || [
    { id: "dummy1", name: "টেস্ট পণ্য ১", images: [] },
    { id: "dummy2", name: "টেস্ট পণ্য ২", images: [] },
    { id: "dummy3", name: "টেস্ট পণ্য ৩", images: [] },
  ]);
  return (
    <div>
      <h2 className="text-lg font-bold mb-2">{storeName}</h2>
      <ProductDragDropList items={products} onReorder={setProducts} />
    </div>
  );
};
export default DragDropEditor;
