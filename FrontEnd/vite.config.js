import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {  loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  
  const env = loadEnv(mode, process.cwd(),'');
  
  return {  
    define: {
      ...Object.keys(env).reduce((prev, key) => {
        prev[`process.env.${key}`] = JSON.stringify(env[key])
        return prev
      }, {}),
    },
    plugins: [react()],
    // server: {
    //   allowedHosts: ['ecommerce-frontend-muio.onrender.com']
    // },
  }
})


// define: {
//   process.env.SOME_ENV : `"${process.env.SOME_ENV}"`
// }