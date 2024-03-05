import { createSlice } from "@reduxjs/toolkit";

// const initialState = "hi";
const packageSlice = createSlice({
  name: "selectedPackage",
  initialState: {
    packageId: "",
  },
  reducers: {
    setPackage(state, action) {
      console.log(action.payload);
      state.packageId = action.payload;
    },
  },
});

export const { setPackage } = packageSlice.actions;
export default packageSlice.reducer;
