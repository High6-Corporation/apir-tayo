module.exports = {
  apps: [{
    name: 'apirtayo',
    script: 'npm',
    args: 'start -- -p 3002',
    cwd: '/home/projects/apirtayo',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
    }
  }]
};
