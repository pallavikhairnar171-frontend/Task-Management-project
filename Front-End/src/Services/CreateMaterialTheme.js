import { createTheme } from "@mui/material/styles";

export const CreateThemeMaterial = (apiTheme) => {
  if (!apiTheme) return createTheme();

  const { colors, mode, buttonType, inputType } = apiTheme;
  console.log(colors, mode, buttonType, inputType);
  return createTheme({
    palette: {
      mode,
      background: {
        default: colors.background.main,
        paper: colors.background.paper,
      },
      primary: {
        main: colors.button.primary.background,
      },
      text: {
        primary: colors.text.primary,
        secondary: colors.text.secondary,
      },
    },

    components: {
      MuiButton: {
        defaultProps: {
          variant: buttonType || "contained",
        },
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
      MuiDatePicker: {
        defaultProps: {
          slotProps: {
            textField: {
              variant: inputType || "standard",
              size: "small",
              fullWidth: true,
            },
          },
        },
      },

      MuiTextField: {
        defaultProps: {
          variant: inputType || "standard",
        },
      },
    },
  });
};
