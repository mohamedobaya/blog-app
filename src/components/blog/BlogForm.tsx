import { useEffect, useState } from "react";
import { Divider, Stack, TextField, Typography } from "@mui/material";
import PostAddIcon from "@mui/icons-material/PostAdd";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import ButtonCustom from "../buttons/ButtonCustom";
import { darkModeColors, lightModeColors } from "../../assets/styles/colors";
import { blogCardStyle } from "../../assets/styles/BlogCardStyle";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import AvatarUpload from "../buttons/AvatarUpload";
import { useAppSelector } from "../../redux/hooks";
import type Blog from "../../types/blog";
import type { BlogFormData } from "../../types/blog";
import { useAppDispatch } from "../../redux/hooks";
import { addBlog, updateBlog } from "../../redux/slices/blogsSlice";

interface Props {
  theme: string;
  blog?: Blog;
}

const BlogForm = ({ theme, blog }: Props) => {
  // ------------------------------ //
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const isEditMode = !!blog;
  // ---- handling image url -------
  const [blogImageURL, setblogImageURL] = useState(blog?.imageURL || "");
  const blogImageHandler = (url: string) => {
    setblogImageURL(url);
  };
  // -------------------------------
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<BlogFormData>();

  // Pre-fill form if editing
  useEffect(() => {
    if (blog) {
      setValue("title", blog.title);
      setValue("body", blog.body);
      setblogImageURL(blog.imageURL || ""); // Pre-fill image URL
    }
  }, [blog, setValue]);

  const handleFormSubmit = async (data: BlogFormData) => {
    if (!user) {
      navigate("/login");
      return;
    }
    const blogData: Blog = {
      bid: blog?.bid || "", // Empty if adding new
      title: data.title,
      body: data.body,
      date: isEditMode ? blog!.date : new Date().toISOString(),
      uid: user.uid,
      imageURL: blogImageURL,
    };

    try {
      if (isEditMode) {
        await dispatch(updateBlog(blogData)).unwrap();
      } else {
        await dispatch(addBlog(blogData)).unwrap();
      }
      navigate("/"); // Redirect after success
    } catch (error) {
      console.error("Error submitting blog:", error);
    }
  };

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <Stack
      component="form"
      sx={{
        ...blogCardStyle(theme),
        padding: {
          xs: "2em",
          sm: "3em",
          md: "5em",
        },
        bgcolor: `${
          theme === "light" ? lightModeColors.surface : darkModeColors.surface
        }`,
      }}
      spacing={2}
      onSubmit={handleSubmit(handleFormSubmit)}
    >
      <Typography variant="h3" sx={{ paddingBottom: "1em" }}>
        {isEditMode ? "Edit Blog" : "New Blog"}
      </Typography>
      <AvatarUpload theme={theme} imageUploadHandler={blogImageHandler} />

      <Divider />
      <TextField
        id="title"
        label="Title"
        variant="outlined"
        color={errors.title ? "error" : "success"}
        {...register("title", {
          required: true,
          minLength: 5,
        })}
        helperText={
          errors.title ? "Title must be at least 5 characters in length" : ""
        }
        slotProps={{
          formHelperText: {
            sx: {
              color:
                theme === "light"
                  ? lightModeColors.error
                  : darkModeColors.error,
            },
          },
        }}
      />
      <TextField
        multiline
        rows={4}
        id="body"
        label="Description"
        variant="outlined"
        color={errors.body ? "error" : "success"}
        {...register("body", {
          required: true,
          minLength: 15,
        })}
        helperText={
          errors.body
            ? "Description must be at least 15 characters in length"
            : ""
        }
        slotProps={{
          formHelperText: {
            sx: {
              color:
                theme === "light"
                  ? lightModeColors.error
                  : darkModeColors.error,
            },
          },
        }}
      />
      <ButtonCustom
        theme={theme}
        content={isEditMode ? "Update Blog" : "Add Blog"}
        color={
          theme === "light" ? lightModeColors.success : darkModeColors.success
        }
        ButtonIcon={isEditMode ? EditIcon : PostAddIcon}
        isSubmit={true}
        onClick={() => {}}
      />
      <ButtonCustom
        theme={theme}
        content="cancel"
        color={theme === "light" ? lightModeColors.error : darkModeColors.error}
        ButtonIcon={CloseIcon}
        isSubmit={false}
        onClick={() => {
          navigate("/");
        }}
      />
    </Stack>
  );
};

export default BlogForm;
