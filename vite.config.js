import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
// export default {
//     server: {
//         port: 5173, // 指定端口号为 5173
//         strictPort: true, // 确保端口不会递增
//     },
// };
