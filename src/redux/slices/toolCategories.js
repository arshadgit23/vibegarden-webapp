import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categories: [],
};

const toolCategories = createSlice({
  name: "toolCategories",
  initialState,
  reducers: {
    setToolCategories: (state, action) => {
      state.categories = action.payload;
    },
    resetToolCategories: (state) => {
      state.categories = [];
    },
  },
});

export const { setToolCategories, resetToolCategories } =
  toolCategories.actions;

export default toolCategories.reducer;
