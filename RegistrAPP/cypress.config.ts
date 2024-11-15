const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:8100', // Cambia esto si tu app corre en otro puerto
    supportFile: false, // Desactiva los archivos de soporte si no los necesitas
  },
});
