import * as esbuild from 'esbuild';

const clientOptions = {
  entryPoints: ['gclient/src/extension.ts'],
  bundle: true,
  minify: process.env.NODE_ENV === 'production',
  sourcemap: process.env.NODE_ENV === 'development',
  mainFields: ['module', 'main'],
  external: ['coc.nvim'],
  platform: 'node',
  target: 'node18',
  outfile: 'gclient/out/extension.js',
};

const serverOptions = {
  entryPoints: ['gserver/src/server.ts'],
  bundle: true,
  minify: process.env.NODE_ENV === 'production',
  sourcemap: process.env.NODE_ENV === 'development',
  mainFields: ['module', 'main'],
  external: ['coc.nvim'],
  platform: 'node',
  target: 'node18',
  outfile: 'gserver/out/server.js',
};

if (process.argv.length > 2 && process.argv[2] === '--watch') {
  const ctx = await esbuild.context(clientOptions);
  await ctx.watch();
  console.log('watching...');
} else {
  const clientResult = await esbuild.build(clientOptions);
  if (clientResult.errors.length) {
    console.error(clientResult.errors);
  }
  const serverResult = await esbuild.build(serverOptions);
  if (serverResult.errors.length) {
    console.error(serverResult.errors);
  }
}
