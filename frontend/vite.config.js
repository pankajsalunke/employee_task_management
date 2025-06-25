import {defineConfig} from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
   
    host: '0.0.0.0',  
    port: process.env.PORT || 5173, 

    proxy: {
      "/api": "http://localhost:3000",
    },
  },
  plugins: [react(), tailwindcss()],
  
});
