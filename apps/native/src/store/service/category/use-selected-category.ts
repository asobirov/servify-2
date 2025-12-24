import { create } from "zustand";

type SelectedCategoryState = {
  selectedCategorySlug: string | null;
  setSelectedCategorySlug: (categorySlug: string | null) => void;
};

export const useSelectedCategory = create<SelectedCategoryState>()((set) => ({
  selectedCategorySlug: null,
  setSelectedCategorySlug: (slug: string | null) => {
    set({ selectedCategorySlug: slug });
  },
}));
