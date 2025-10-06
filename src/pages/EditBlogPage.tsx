// pages/EditBlogPage.tsx

import BlogForm from "../components/blog/BlogForm";
import { useAppSelector } from "../redux/hooks";
// import { updateBlog } from "../redux/slices/blogsSlice";
import { useParams } from "react-router";

const EditBlogPage = ({ theme }: { theme: string }) => {
  const { bid } = useParams();

  const blog = useAppSelector((state) =>
    state.blogs.data.find((b) => b.bid === bid)
  );

  if (!blog) return <div>Blog not found</div>;

  return <BlogForm theme={theme} blog={blog} />;
};

export default EditBlogPage;
