import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { buttonStyle } from "../../assets/styles/ButtonStyle";
import { darkModeColors, lightModeColors } from "../../assets/styles/colors";
import { supabase } from "../../data/supabaseClient";
import { useState } from "react";
import { Box, Stack } from "@mui/material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const AvatarUpload = ({
  theme,
  imageUploadHandler,
}: {
  theme: string;
  imageUploadHandler: (URL: string) => void;
}) => {
  const [_, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [imageURL, setImageURL] = useState("");

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files || !event.target.files[0]) return;
    const file = event.target.files[0];
    setImageFile(file);
    await handleImageUpload(file);
  };

  const handleImageUpload = async (file: File) => {
    try {
      setUploading(true);
      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}.${ext}`;
      const filePath = fileName;

      // Upload to Supabase Storage
      const { error } = await supabase.storage
        .from("blogify")
        .upload(filePath, file);

      if (error) throw error;

      // Get public URL
      const { data: publicData } = supabase.storage
        .from("blogify")
        .getPublicUrl(filePath);

      setImageURL(publicData.publicUrl);
      imageUploadHandler(publicData.publicUrl);
      // alert("Image uploaded successfully!");
    } catch (error: any) {
      // alert(`Error uploading image: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Stack>
      <Button
        component="label"
        size="small"
        startIcon={<CloudUploadIcon />}
        sx={buttonStyle(
          theme,
          theme === "dark" ? darkModeColors.primary : lightModeColors.primary
        )}
        disabled={uploading}
      >
        {uploading ? "Uploading..." : "Upload Image"}
        <VisuallyHiddenInput
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      </Button>

      {imageURL && (
        <Box mt={2}>
          <img
            src={imageURL}
            alt="Uploaded"
            style={{ width: "200px", borderRadius: "8px" }}
          />
        </Box>
      )}
    </Stack>
  );
};

export default AvatarUpload;
