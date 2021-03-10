import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';

import pkg from './package.json';

export default {
    preserveModules: false,
    input: 'src/index.tsx',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
      },
      {
          file: pkg.module,
          format: 'es',
          sourcemap: true,
      }
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ],
    plugins: [
          typescript(),
          postcss({
            modules: true
          })
      ],
    }