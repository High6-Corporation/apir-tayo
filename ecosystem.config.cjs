module.exports = {
  apps: [{
    name: 'apirtayo',
    script: '/home/projects/apirtayo/node_modules/next/dist/bin/next',
    args: 'start -p 3002',
    cwd: '/home/projects/apirtayo',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production'
      // WP_SITE_URL, WP_GRAVITY_* etc. come from .env (untracked) — do not commit secrets here
    }
  }]
};
