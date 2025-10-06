// store/slices/authSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface UserData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface AuthState {
  user: UserData | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      if (action.payload) {
        // Store only serializable data
        state.user = {
          uid: action.payload.uid,
          email: action.payload.email,
          displayName: action.payload.displayName,
          photoURL: action.payload.photoURL,
        };
      } else {
        state.user = null;
      }
      state.isLoading = false;
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
