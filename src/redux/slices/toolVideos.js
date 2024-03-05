import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videos: [],
};

const toolVideosSlice = createSlice({
  name: "toolVideos",
  initialState,
  reducers: {
    setToolVideos: (state, action) => {
      state.videos = action.payload.videos;
    },
  },
});

export const { setToolVideos } = toolVideosSlice.actions;
export default toolVideosSlice.reducer;
