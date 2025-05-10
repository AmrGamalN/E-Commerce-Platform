import { MockData } from "@/services/MockData/categories";
import { CategoryNode, Option } from "@/types/categorySelection";
import { Category, Subcategory } from "@/types/categories";

// Control input change for file uploads
export const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>): File[] => {
  const files = e.target.files;
  if (!files || files.length === 0) return [];
  return files ? Array.from(files) : [];
};

// Select category, subcategory & nested subcategories if they exist, else display types
export const getCategoryOptions = (mockData: CategoryNode[], selectedId: string): Option[] => {
  // Function to find category by ID
  const findCategory = (categories: CategoryNode[] | undefined, id: string): CategoryNode | null => {
    if (!categories) return null;
    for (const category of categories) {
      if (category._id === id) return category;
      const result = findCategory(category.subcategories || [], id);
      if (result) return result;
    }
    return null;
  };

  const selectedCategory = mockData && findCategory(mockData, selectedId);
  if (!selectedCategory) return [];

  if (selectedCategory?.subcategories?.length) {
    return selectedCategory.subcategories.map((sub) => ({
      _id: sub._id,
      value: sub._id,
      label: sub.name,
    }));
  } else if (selectedCategory?.types?.length) {
    return selectedCategory?.types.map((type) => ({
      _id: type._id,
      value: type._id,
      label: type.name,
    }));
  }
  return [];
};

// Get brand options based on selected path
export const getBrandOptions = (path: string[]): { brands: Option[]; LastChoice: boolean } => {
  if (!MockData || MockData.length === 0) {
    console.error("MockData is undefined");
    return { brands: [], LastChoice: false };
  }

  let currentLevel: CategoryNode[] = MockData;
  for (const levelName of path) {
    const nextLevel = currentLevel.find((node) => node.name === levelName);
    if (!nextLevel) {
      return { brands: [], LastChoice: false };
    }
    if (nextLevel.brands?.length) {
      const brands = nextLevel.brands.map((brand) => ({
        _id: brand._id,
        value: brand.name,
        label: brand.name,
      }));
      const LastChoice = !nextLevel.subcategories || nextLevel.subcategories.length === 0;
      return { brands, LastChoice };
    }
    currentLevel = nextLevel.subcategories || [];
  }
  return { brands: [], LastChoice: false };
};

// to find a category by ID
export const getCategoryById = (categories: Category[], id: string): Category | undefined => {
  return categories.find((category) => category._id === id);
};

// to find a subcategory by ID
export const getSubcategoryById = (subcategories: Subcategory[], id: string): Subcategory | undefined => {
  return subcategories.find((subcategory) => subcategory._id === id);
};

// flatten subcategories recursively
export const flattenSubcategories = (subcategories: Subcategory[]): Subcategory[] => {
  let flattened: Subcategory[] = [];
  subcategories.forEach((subcategory) => {
    flattened.push(subcategory);
    if (subcategory.subcategories) {
      flattened = flattened.concat(flattenSubcategories(subcategory.subcategories));
    }
  });
  return flattened;
};
