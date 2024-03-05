import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  userId: null,
  token: null,
  url: null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log("action payload ==>  : ", action.payload);
      state.user = action.payload;
      state.userId = action.payload?._id;
    },
    saveToken: (state, action) => {
      state.token = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      state.userId = null;
      state.token = null;
      localStorage.removeItem("token");
    },
    setUrl(state, action) {
      const url = action.payload;
      state.url = url;
    },
  },
});

export const { setUser, saveToken, logoutUser, setUrl } = userSlice.actions;
export default userSlice.reducer;
