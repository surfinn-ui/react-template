import react from '@vitejs/plugin-react-swc';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import removeConsole from 'vite-plugin-remove-console';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: './.env',
  envPrefix: 'REACT_', // default  REACT_APP_ 으로 설정하면 .env 파일에서 REACT_APP_ 로 시작하는 변수를 읽어온다.
  plugins: [react(), removeConsole()],
  appType: 'mpa', // multi-page application
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  
  // 개발 서버 설정
  server: {
    host: 'localhost',
    open: true,
  },
  // 빌드
  build: {
    outDir: 'build',
  },
  // 빌드한 파일을 실행할 서버 설정
  preview: {
    host: 'localhost',
  },
});
