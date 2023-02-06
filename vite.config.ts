import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  envDir: './.env',
  envPrefix: 'VITE_', // default  REACT_APP_ 으로 설정하면 .env 파일에서 REACT_APP_ 로 시작하는 변수를 읽어온다.
  plugins: [react()],
  appType: 'mpa', // multi-page application
  // 개발 서버
  server: {
    host: 'local.surfinn.kr',
    open: true,
  },
  // 빌드
  build: {
    outDir: 'build',
  },
  // 빌드한 파일을 실행할 서버
  preview: {
    host: 'local.surfinn.kr',
    open: true,
  },
});
