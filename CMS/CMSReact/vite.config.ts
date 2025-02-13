import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  build:{
    outDir: '../wwwroot',
    //#emptyOutDir: true, // This will delete all files in the output directory before building
    emptyOutDir: true, 
  },
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:5001',
        changeOrigin: true,
        secure: false, // Ha a cél HTTPS és önaláírt tanúsítványt használ
        //rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
