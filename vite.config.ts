import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import webspatial from "@webspatial/vite-plugin";
import { createHtmlPlugin } from "vite-plugin-html";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@webspatial/react-sdk",
    }),
    webspatial(),
    createHtmlPlugin({
      inject: {
        data: {
          XR_ENV: process.env.XR_ENV,
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "~": "/src",
    },
  },
});
