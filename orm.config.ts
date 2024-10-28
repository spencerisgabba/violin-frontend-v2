import './envConfig.ts';
import {defineConfig} from "next/dist/experimental/testmode/playwright";

export default defineConfig({
    dbCredentials: {
        connectionString: process.env.DATABASE_URL!,
    },
});