import BlogList from "../components/blog/BlogList";
import AddBlogButton from "../components/blog/AddBlogButton";
import { Box } from "@mui/material";
import { useAppSelector } from "../redux/hooks";

const HomePage = ({ theme }: { theme: string }) => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Box component="div">
      <BlogList theme={theme} />
      {user && <AddBlogButton theme={theme} />}
    </Box>
  );
};

export default HomePage;
