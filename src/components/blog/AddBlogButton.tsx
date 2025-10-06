import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
import { addBlogStyle } from "../../assets/styles/AddBlogStyle";

interface Props {
  theme: string;
}

const AddBlogButton = ({ theme }: Props) => {
  const navigate = useNavigate();
  return (
    <IconButton
      onClick={() => navigate("/add-blog")}
      color="primary"
      size="large"
      sx={addBlogStyle(theme)}
    >
      <AddIcon />
    </IconButton>
  );
};

export default AddBlogButton;
