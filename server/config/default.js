module.exports = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  staticBase: './client/build',
  loggerOptions: 'dev',
  spark: {
    apiToken: 'SECRET',
    deviceId: 'SECRET'
  },
  hue: {
    username: 'SECRET'
  }
};
