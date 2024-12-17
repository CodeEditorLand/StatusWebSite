import type { defineConfig } from "astro/config";

export const On = process.env["NODE_ENV"] === "development";

export default (await import("astro/config")).defineConfig({
	srcDir: "./Source",
	publicDir: "./Public",
	outDir: "./Target",
	site: On ? "HTTP://localhost" : "HTTPS://Status.Editor.Land",
	compressHTML: !On,
	prefetch: {
		defaultStrategy: "hover",
		prefetchAll: true,
	},
	server: {
		port: 9999,
	},
	build: {
		concurrency: 9999,
	},
	integrations: [
		// @ts-ignore
		import.meta.env.MODE === "production"
			? (await import("astrojs-service-worker")).default()
			: null,
		(await import("@astrojs/sitemap")).default(),
		!On ? (await import("@playform/inline")).default({ Logger: 1 }) : null,	
		!On ? (await import("@playform/format")).default({ Logger: 1 }) : null,
		!On
			? (await import("@playform/compress")).default({ Logger: 1 })
			: null,
			],
	experimental: {
		clientPrerender: true,
		contentIntellisense: true,
	},
	vite: {
		build: {
			sourcemap: true,
		},
		resolve: {
			preserveSymlinks: true,
		},
		css: {
			devSourcemap: On,
			transformer: "postcss",
		},
	},
}) as typeof defineConfig;
