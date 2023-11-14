// vite.config.js
export default {
  build: {
    assetsInclude: ['./*'],
    rollupOptions: {
      input: {
        main: 'src/main.js', // Adjust this path based on your project structure
      },
      external: ['index.html'], // Exclude index.html from being treated as a module
    },
  },
};
