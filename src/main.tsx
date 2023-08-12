import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "./index.css";
import chakraTheme from "@chakra-ui/theme";

const { Button: BaseButton, Heading: BaseHeading } = chakraTheme.components;

const theme = extendTheme({
  components: {
    Button: {
      ...BaseButton,
      baseStyle: {
        ...BaseButton.baseStyle,
        lineHeight: 0,
      },
      defaultProps: {
        ...BaseButton.defaultProps,
        colorScheme: "teal",
      },
    },
    Heading: {
      baseStyle: {
        ...BaseHeading.baseStyle,
        fontFamily: "Red Alert",
      },
    },
  },
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
