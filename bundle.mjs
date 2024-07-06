import esbuild from "esbuild";
import { sassPlugin } from "esbuild-sass-plugin";
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';

esbuild.build({
  logLevel: 'info',
  entryPoints: [
    { in: 'wwwroot/js/app.ts', out: 'js/app.bundle'},
    { in: 'wwwroot/css/app.css', out: 'css/app.bundle'},
  ],
  bundle: true,
  minify: false,
  sourcemap: true,
    metafile: true,
    plugins: [
      sassPlugin({
        async transform(source) {
          const { css } = await postcss([autoprefixer]).process(source, { from: undefined });
          return css;
        },
      }),
    ],
    outdir: 'wwwroot'
})
.then(() => console.log("⚡ Build complete! ⚡"))
.catch(() => process.exit(1));