import { useColorModeValue } from "@/components/ui/color-mode";
import { Box, BoxProps, Code } from "@chakra-ui/react";
import { ReactNode } from "react";
import { FaCheck, FaCopy } from "react-icons/fa";
import { useCopyToClipboard } from "usehooks-ts";

export const CodeBlock = ({
  children,
  ...rest
}: { children: ReactNode } & BoxProps) => {
  const [copiedText, copy] = useCopyToClipboard();

  const handleCopy = (text: string) => () => {
    copy(text)
      .then(() => {
        console.log("Copied!", { text });
        setTimeout(() => {
          copy("");
        }, 2000);
      })
      .catch((error) => {
        console.error("Failed to copy!", error);
      });
  };

  return (
    <Box w="full" maxH="500px" overflowY="auto" {...rest}>
      <Code
        variant="surface"
        colorPalette={useColorModeValue("orange", "teal")}
        my={4}
        p={4}
        w="full"
        position="relative"
      >
        <Box
          onClick={handleCopy(children as string)}
          style={{ position: "absolute", top: 5, right: 5 }}
          cursor="pointer"
        >
          {copiedText ? <FaCheck size={16} /> : <FaCopy size={16} />}
        </Box>
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
