import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type Blog from "../../types/blog";

// ------ firebase code ------ //
import { db } from "../../config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";

const blogsCollectionRef = collection(db, "blogs");

// Get all blogs
const getBlogs = async () => {
  const data = await getDocs(blogsCollectionRef);
  return data.docs.map((doc) => {
    const docData = doc.data();
    return {
      bid: doc.id,
      title: docData.title,
      body: docData.body,
      date: docData.data?.toDate().toISOString() || new Date().toISOString(),
      imageURL: docData.imageURL,
      uid: docData.uid,
    } as Blog;
  });
};

// Add a new blog
const addBlogToFirestore = async (blog: Omit<Blog, "bid">) => {
  const docRef = await addDoc(blogsCollectionRef, {
    title: blog.title,
    body: blog.body,
    date: Timestamp.fromDate(new Date(blog.date)),
    imageURL: blog.imageURL,
    uid: blog.uid,
  });

  return {
    bid: docRef.id,
    ...blog,
  } as Blog;
};

// Update a blog
const updateBlogInFirestore = async (blog: Blog) => {
  const blogDoc = doc(db, "blogs", blog.bid);
  await updateDoc(blogDoc, {
    title: blog.title,
    body: blog.body,
    imageURL: blog.imageURL,
    date: Timestamp.fromDate(new Date(blog.date)),
  });
  return blog;
};

// Delete a blog
const deleteBlogFromFirestore = async (bid: string) => {
  const blogDoc = doc(db, "blogs", bid);
  await deleteDoc(blogDoc);
  return bid;
};

// ------------------------- //

interface BlogsState {
  data: Blog[];
  isLoading: boolean;
  error: string | null;
}

const initialState: BlogsState = {
  data: [],
  isLoading: false,
  error: null,
};

// Async thunks
export const fetchBlogs = createAsyncThunk("blogs/fetchBlogs", async () => {
  return getBlogs();
});

export const addBlog = createAsyncThunk(
  "blogs/addBlog",
  async (blog: Omit<Blog, "bid">) => {
    return addBlogToFirestore(blog);
  }
);

export const updateBlog = createAsyncThunk(
  "blogs/updateBlog",
  async (blog: Blog) => {
    return updateBlogInFirestore(blog);
  }
);

export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (bid: string) => {
    return deleteBlogFromFirestore(bid);
  }
);

const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch blogs
      .addCase(fetchBlogs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch blogs";
      })
      // Add blog
      .addCase(addBlog.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.push(action.payload);
      })
      .addCase(addBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to add blog";
      })
      // Update blog
      .addCase(updateBlog.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.data.findIndex((b) => b.bid === action.payload.bid);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to update blog";
      })
      // Delete blog
      .addCase(deleteBlog.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = state.data.filter((b) => b.bid !== action.payload);
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to delete blog";
      });
  },
});

export default blogsSlice.reducer;
