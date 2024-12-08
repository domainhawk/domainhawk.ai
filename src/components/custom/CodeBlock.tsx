import { Box, Code } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useColorModeValue } from "../ui/color-mode";

export const CodeBlock = ({ children }: { children: ReactNode }) => {
  return (
    <Box w="full">
      <Code
        variant="surface"
        colorPalette={useColorModeValue("orange", "teal")}
        my={4}
        p={4}
      >
        <pre
          style={{
            margin: 0,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          {children}
        </pre>
      </Code>
    </Box>
  );
};
