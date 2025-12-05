import * as esbuild from 'esbuild';
import { copyFileSync, mkdirSync, readdirSync } from 'fs';
import { join } from 'path';

await esbuild.build({
  entryPoints: ['server/_core/index.ts'],
  bundle: true,
  platform: 'node',
  target: 'node18',
  format: 'esm',
  outfile: 'dist/index.js',
  packages: 'external', // Automatically mark all node_modules as external
  sourcemap: true,
  minify: false,
  treeShaking: true,
});

console.log('✓ Server bundle built successfully');

// Copy frontend build to dist/public for production
function copyRecursive(src, dest) {
  mkdirSync(dest, { recursive: true });
  const entries = readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

// Copy index.html and assets to dist/public
mkdirSync('dist/public', { recursive: true });
copyFileSync('dist/index.html', 'dist/public/index.html');
if (readdirSync('dist').includes('assets')) {
  copyRecursive('dist/assets', 'dist/public/assets');
}
console.log('✓ Frontend files copied to dist/public');
