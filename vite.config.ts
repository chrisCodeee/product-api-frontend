import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			"/users/register": {
				target: "https://product-api-backend-production-f72b.up.railway.app",
				changeOrigin: true,
				secure: false,
			},
			"/users/login": {
				target: "https://product-api-backend-production-f72b.up.railway.app",
				changeOrigin: true,
				secure: false,
			},
			"/products/add": {
				target: "https://product-api-backend-production-f72b.up.railway.app",
				changeOrigin: true,
				secure: false,
			},
			"/products/views": {
				target: "https://product-api-backend-production-f72b.up.railway.app",
				changeOrigin: true,
				secure: false,
			},
		},
	},
});
