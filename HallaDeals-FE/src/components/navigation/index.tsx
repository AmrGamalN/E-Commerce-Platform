import React from "react";
import { MockData } from "@/services/MockData/categories";
import { getCategoryById } from "@/utils/CategorySelection";

type MainContentProps = {
  activeCategoryId: string | null;
};

const MainContent: React.FC<MainContentProps> = ({ activeCategoryId }) => {
  const activeCategory = activeCategoryId ? getCategoryById(MockData, activeCategoryId) : null;

  return (
    <div className="flex-grow p-4">
      {activeCategory ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">{activeCategory.name}</h2>
          <p>This is the main content for {activeCategory.name}.</p>
        </div>
      ) : (
        <p>Select a category to view its details.</p>
      )}
    </div>
  );
};

export default MainContent;
