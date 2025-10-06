import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";

export interface User {
  uid: string;
  photoURL: string;
  email: string;
  username: string;
}

interface UsersState {
  data: Record<string, User>; // cache users by uid
  isLoading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  data: {},
  isLoading: false,
  error: null,
};

// Async thunk: fetch a user by uid
export const fetchUser = createAsyncThunk(
  "users/fetchUser",
  async (uid: string) => {
    const userDoc = doc(db, "users", uid);
    const snap = await getDoc(userDoc);

    if (!snap.exists()) {
      throw new Error("User not found");
    }

    const userData = snap.data() as Omit<User, "uid">;
    return { uid: snap.id, ...userData } as User;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        // cache by uid
        state.data[action.payload.uid] = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch user";
      });
  },
});

export default usersSlice.reducer;
