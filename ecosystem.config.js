module.exports = {
  apps: [
    {
      name: 'pokedex_backend',
      script: './dist/src/start.js',
      instances: -1,
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
      max_memory_restart: '1G',
      exec_mode : 'cluster',
    },
  ],
};
