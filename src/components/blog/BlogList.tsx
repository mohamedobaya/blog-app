import { Stack } from "@mui/material";
import type Blog from "../../types/blog";
import BlogCard from "./BlogCard";
import { fetchBlogs } from "../../redux/slices/blogsSlice";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect } from "react";
import LoadingBlogs from "../LoadingBlogs";

interface Props {
  theme: string;
}

const BlogList = ({ theme }: Props) => {
  const dispatch = useAppDispatch();
  const { isLoading, data, error } = useAppSelector((state) => state.blogs);
  useEffect(() => {
    dispatch(fetchBlogs());
  }, []);

  if (isLoading) return <LoadingBlogs />;
  if (error) return <div>Error: {error}</div>;

  return (
    <Stack>
      {[...data].reverse().map((blog: Blog) => (
        <BlogCard key={blog.bid} blog={blog} theme={theme} />
      ))}
    </Stack>
  );
};

export default BlogList;
