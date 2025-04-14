import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  build: {
    outDir: "../wwwroot",
    //#emptyOutDir: true, // This will delete all files in the output directory before building
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: "index.html",
        customercheckout: "customercheckout.html",
        dailyspecials: "dailyspecials.html",
        login: "login.html",
        profile: "profile.html",
        profileCustomer: "profileCustomer.html",
        profileEmployee: "profileEmployee.html",
        registration: "registration.html",
        restaurant: "restaurant.html",
        tickets: "tickets.html",
        ticketvalidation: "ticketvalidation.html",
      },
    },
  },
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://localhost:5001",
        changeOrigin: true,
        secure: false, // Ha a cél HTTPS és önaláírt tanúsítványt használ
        //rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
