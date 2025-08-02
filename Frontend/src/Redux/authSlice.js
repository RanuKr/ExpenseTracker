import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    user: null,
  },
  reducers: {
    // Set loading state
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    // Set logged-in user
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
    // Optional: logout action
    logout: (state) => {
      state.user = null;
    },
  },
});

// Export actions
export const { setLoading, setAuthUser, logout } = authSlice.actions;

// Export reducer
export default authSlice.reducer;
