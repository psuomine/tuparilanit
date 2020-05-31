import { theme } from "@chakra-ui/core";

console.log({ theme });

const customTheme = {
  ...theme,
  fonts: {
    heading: '"Inter", sans-serif',
    body: '"Inter", sans-serif',
    mono: '"Inter", monospace',
  },
  fontSizes: {
    ...theme.fontSizes,
    "10xl": "8rem",
  },
  colors: {
    ...theme.colors,
    brand: {
      primary: "#6E6EFF",
      secondary: "#777799",
      border: "#3F3F59",
      bg: "#27273E",
    },
  },
};

export default customTheme;
