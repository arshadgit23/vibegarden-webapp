import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videos: [],
};

const groundWorkVideosSlice = createSlice({
  name: "groundWorkVideos",
  initialState,
  reducers: {
    setGWVideos: (state, action) => {
      state.videos = action.payload.videos;
    },
  },
});

export const { setGWVideos } = groundWorkVideosSlice.actions;
export default groundWorkVideosSlice.reducer;
