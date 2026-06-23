import { defineConfig } from "vite";

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
