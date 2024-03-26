import {defineConfig} from "vite";
import {configDefaults} from "vitest/config";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
// noinspection JSUnusedGlobalSymbols
export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: "jsdom",
        coverage: {
            exclude: [
                ...configDefaults.coverage.exclude,
                "*.config.js"
            ]
        }
    }
});
