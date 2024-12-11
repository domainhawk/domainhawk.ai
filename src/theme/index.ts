import { createSystem, defaultConfig, defineTokens } from "@chakra-ui/react";

const tokens = defineTokens({
  fonts: {
    body: { value: "Poppins, sans-serif" },
    heading: { value: "Poppins, sans-serif" },
  },
});

export default createSystem(defaultConfig, {
  theme: { tokens },
});
