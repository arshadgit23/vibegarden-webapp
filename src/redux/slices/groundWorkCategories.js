import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
};

const groundWorkCategoriesSlice = createSlice({
  name: "groundWorkCategories",
  initialState,
  reducers: {
    setGWCategories: (state, action) => {
      state.categories = action.payload;
    },
    resetCategories: (state) => {
      state.categories = [];
    },
  },
});

export const { setGWCategories, resetGWCategories } =
  groundWorkCategoriesSlice.actions;

export default groundWorkCategoriesSlice.reducer;
