// vite.config.mts
import { defineConfig } from 'vite';
import { resolve } from 'path';
import { fileURLToPath } from 'url';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = resolve(__filename, '..');

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
});
