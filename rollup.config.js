import typescript from "@rollup/plugin-typescript";
import copy from "rollup-plugin-copy";

export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "esm",
  },
  plugins: [
    typescript({
      declaration: true,
      declarationDir: "dist",
    }),
    copy({
      targets: [
        { src: "wasm/*.wasm", dest: "dist" },
      ],
    }),
  ],
};
