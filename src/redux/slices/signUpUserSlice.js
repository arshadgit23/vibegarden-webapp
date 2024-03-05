import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  error: "",
};

const signUpUserSlice = createSlice({
  name: "signUpUser",
  initialState,
  reducers: {
    signUpUser: (state, action) => {
      console.log("redux signing up");
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { signUpUser, setError } = signUpUserSlice.actions;
export default signUpUserSlice.reducer;
