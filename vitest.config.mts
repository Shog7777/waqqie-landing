import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

/** اختبارات الوحدة للمنطق الخالص في `src/lib` — بلا متصفح ولا DOM. */
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
