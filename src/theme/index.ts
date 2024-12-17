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
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    _dark: {
      backgroundImage: "url('/images/dark.jpg')",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
    },
  },
};

export default createSystem(defaultConfig, {
  theme: { tokens },
  globalCss,
});
