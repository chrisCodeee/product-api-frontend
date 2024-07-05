import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		// proxy: {
		// 	"/users/register": {
		// 		target: "http://localhost:8080",
		// 		changeOrigin: true,
		// 		secure: false,
		// 	},
		// 	"/users/login": {
		// 		target: "http://localhost:8080",
		// 		changeOrigin: true,
		// 		secure: false,
		// 	},
		// 	"/products/add": {
		// 		target: "http://localhost:8080",
		// 		changeOrigin: true,
		// 		secure: false,
		// 	},
		// 	"/products/views": {
		// 		target: "http://localhost:8080",
		// 		changeOrigin: true,
		// 		secure: false,
		// 	},
		// },
	},
});
