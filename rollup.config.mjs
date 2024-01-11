
import { readFileSync } from 'node:fs';

import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import { nodeResolve } from '@rollup/plugin-node-resolve';
import del from 'rollup-plugin-delete'
const pkg = JSON.parse(readFileSync('./package.json'));

export default [
  {
  external: ['react',"react-dom", 'dayjs', "reactflow"],
  input: "./src/index.ts",
    output: [
      {
        file:  pkg.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ 
        tsconfig: "./tsconfig.json", 
        declaration: true,
        declarationDir: 'dist',
      }),
      postcss(),
      nodeResolve(),
    ],
  },
  {
    input: "./dist/esm/index.d.ts",
    output: [{ file: "./dist/index.d.ts", format: "esm" }],
    plugins: [
      dts(),
      del({
       targets: ['dist/esm/demo', 'dist/cjs/demo'],
      })
    ],
    external: [/\.(css|less|scss)$/],
  }
];

