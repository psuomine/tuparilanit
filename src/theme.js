import { theme } from "@chakra-ui/core";

const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    brand: {
      primary: "#27273E",
      secondary: "#777799",
      highlight: "#6E6EFF",
    },
  },
};

export default customTheme;
