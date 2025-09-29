import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import webspatial from "@webspatial/vite-plugin";
import { createHtmlPlugin } from "vite-plugin-html";
import basicSsl from "@vitejs/plugin-basic-ssl";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: "@webspatial/react-sdk",
    }),
    webspatial(),
    basicSsl(),
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
