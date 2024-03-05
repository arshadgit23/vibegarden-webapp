import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  src: "//vjs.zencdn.net/v/oceans.mp4",
};

const videoSlice = createSlice({
  initialState,
  name: "video",
  reducers: {
    updateSrc: (state, action) => {
      console.log("updating video source", action.payload);
      state.src = action.payload;
    },
  },
});

export const { updateSrc } = videoSlice.actions;
export default videoSlice.reducer;
