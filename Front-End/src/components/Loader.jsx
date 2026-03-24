import { Backdrop, CircularProgress } from "@mui/material";

const Loader = ({
  open = false,
  fullscreen = true,
  size = 40,
  color = "primary",
}) => {
  if (!open) return null;

  if (fullscreen) {
    return (
      <Backdrop
        open={open}
        sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}
      >
        <CircularProgress size={size} color={color} />
      </Backdrop>
    );
  }

  return <CircularProgress size={size} color={color} />;
};

export default Loader;
