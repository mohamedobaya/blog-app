import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import blogsReducer from "./slices/blogsSlice";
import themeReducer from "./slices/themeSlice";
import usersReducer from "./slices/usersSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    blogs: blogsReducer,
    theme: themeReducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore Firebase User object serialization warnings
        ignoredActions: ["auth/setUser"],
        ignoredPaths: ["auth.user"],
      },
    }),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
