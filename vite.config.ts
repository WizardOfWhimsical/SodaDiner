import { defineConfig } from "vite";
//This is a Vite config file allowing for the front end server to commuinicate with the backend server. The backend is a Nod/Express rserver running of port 3000, the front end is running on port 5173. This file also allows for the use of multiple HTML files in the project, which is necessary for the different pages of the project. Each page has its own HTML file, and this config file allows for Vite to recognize them and serve them correctly.
export default defineConfig({
  build: {
    rolldownOptions: {
      input: {
        main: "index.html",
        diner: "./pages/diner/diner.html",
        addSoda: "./pages/diner/addSoda.html",
        dinerForm: "./pages/diner/dinerForm.html",
        diners: "./pages/diner/diners.html",
        soda: "./pages/soda/soda.html",
        sodaForm: "./pages/soda/sodaForm.html",
        sodas: "./pages/soda/sodas.html",
      },
    },
  },
});
