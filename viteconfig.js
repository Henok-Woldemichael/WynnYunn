// vite.config.js
export default {
    base: 'wynnyunn', // Set this to your repository name
    // other configurations...

    outDir: 'dist',

    build:{
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          wynnyunn: resolve(__dirname, 'wynnyunn/index.html')
        }
    }
    
    }
  }
  