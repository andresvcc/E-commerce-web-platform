export default () => {
  return {
    name: 'health-checker',
    environment: process.env.NODE_ENV || 'local',
    port: parseInt(process.env.PORT) || 3003,
    trace: process.env.DEBUG_TRACE || true,
    auth: {
      salt: process.env.AUTH_SALT || 'secret',
    },
    internTimeOut: 5000,
  };
};
