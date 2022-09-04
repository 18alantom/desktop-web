import vue from '@vitejs/plugin-vue';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default ({ mode }) => {
  const envs = loadEnv(mode, process.cwd());
  process.env = { ...process.env, ...envs };

  const port = Number(process.env.VITE_PORT_FRONTEND);
  return defineConfig({
    server: { host: '0.0.0.0', port, strictPort: true },
    plugins: [vue()],
  });
};
