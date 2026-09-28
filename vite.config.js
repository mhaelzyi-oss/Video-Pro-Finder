import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    target: 'es2020',
    rollupOptions: {
      input: {
        popup: 'popup.js',
        options: 'options.js',
        library: 'library.js',
        resources: 'resources.js',
        background: 'background.js',
        content: 'content.js'
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name]-[hash].js'
      }
    }
  },
  server: {
    port: 4173,
    host: '0.0.0.0'
  }
});
