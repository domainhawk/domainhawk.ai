import { createSystem, defaultConfig, defineTokens } from "@chakra-ui/react";

const tokens = defineTokens({
  fonts: {
    body: { value: "Poppins, sans-serif" },
    heading: { value: "Poppins, sans-serif" },
  },
});

const globalCss = {
  "html, body": {
    backgroundImage: "url('/images/light.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed",
    _dark: {
      backgroundImage: "url('/images/dark.jpg')",
    },
  },
};

export default createSystem(defaultConfig, {
  theme: { tokens },
  globalCss,
});
