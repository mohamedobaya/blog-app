import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { blogCardStyle } from "../../assets/styles/BlogCardStyle";
import type Blog from "../../types/blog";
import IconButtonCustom from "../buttons/IconButtonCustom";
import { darkModeColors, lightModeColors } from "../../assets/styles/colors";
import { Box } from "@mui/material";
import { useNavigate } from "react-router";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { deleteBlog } from "../../redux/slices/blogsSlice";
import ConfirmModal from "../ConfirmModal";
import { fetchUser } from "../../redux/slices/usersSlice";
import { Avatar } from "@mui/material";

interface Props {
  blog: Blog;
  theme: string;
}

const BlogCard = ({ blog, theme }: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const { data: users, isLoading } = useAppSelector((state) => state.users);
  const author = users[blog.uid];

  const canEdit = user && user.uid === blog.uid;

  const handleEdit = () => {
    navigate(`/edit-blog/${blog.bid}`);
  };

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await dispatch(deleteBlog(blog.bid));
      setDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  useEffect(() => {
    if (blog.uid && !author) {
      dispatch(fetchUser(blog.uid));
    }
  }, [blog.uid, author, dispatch]);

  return (
    <>
      <Card sx={blogCardStyle(theme)}>
        <Box
          sx={{
            width: "100%",
            height: 300,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            margin: "1em auto",
          }}
        >
          <Box
            component="img"
            src={blog.imageURL}
            alt={blog.title}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain", // ✅ fits image to box without cropping
              objectPosition: "center",
            }}
          />
        </Box>
        <CardContent>
          {isLoading && !author && (
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 2, marginY: 2 }}
            >
              <Avatar src="" alt="user" />
              <Typography
                sx={{ fontFamily: "monospace", wordSpacing: "-4px" }}
                variant="subtitle2"
              >
                User
              </Typography>
            </Box>
          )}
          {author && (
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 2, marginY: 2 }}
            >
              <Avatar src={author.photoURL} alt={author.username} />
              <Typography
                sx={{ fontFamily: "monospace", wordSpacing: "-4px" }}
                variant="subtitle2"
              >
                {author.username}
              </Typography>
            </Box>
          )}
          <Typography gutterBottom variant="h5" component="div">
            {blog.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {blog.body}
          </Typography>
        </CardContent>

        {canEdit && (
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Box
              component="div"
              sx={{ display: "flex", gap: 2, margin: "0.5em" }}
            >
              <IconButtonCustom
                theme={theme}
                color={
                  theme === "light"
                    ? lightModeColors.primary
                    : darkModeColors.primary
                }
                ButtonIcon={EditIcon}
                onClick={handleEdit}
              />
              <IconButtonCustom
                theme={theme}
                color={
                  theme === "light"
                    ? lightModeColors.error
                    : darkModeColors.error
                }
                ButtonIcon={DeleteIcon}
                onClick={handleDeleteClick}
              />
            </Box>
          </CardActions>
        )}
      </Card>

      <ConfirmModal
        theme={theme}
        open={deleteModalOpen}
        title="Delete Blog"
        message="Are you sure you want to delete this blog? This action cannot be undone."
        onAccept={handleDeleteConfirm}
        onCancel={() => setDeleteModalOpen(false)}
      />
    </>
  );
};

export default BlogCard;
