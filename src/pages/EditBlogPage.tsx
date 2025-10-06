// pages/EditBlogPage.tsx

import BlogForm from "../components/blog/BlogForm";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
// import { updateBlog } from "../redux/slices/blogsSlice";
import { useParams } from "react-router";
import type Blog from "../types/blog";
import type { BlogFormData } from "../types/blog";

const EditBlogPage = ({ theme }: { theme: string }) => {
  const { bid } = useParams();
  const dispatch = useAppDispatch();

  const blog = useAppSelector((state) =>
    state.blogs.data.find((b) => b.bid === bid)
  );

  const handleUpdateBlog = async (blogData: BlogFormData) => {
    if (!bid) return;
    // await dispatch(updateBlog({ bid, ...blogData }));
  };

  if (!blog) return <div>Blog not found</div>;

  return <BlogForm theme={theme} blog={blog} onSubmit={handleUpdateBlog} />;
};

export default EditBlogPage;
