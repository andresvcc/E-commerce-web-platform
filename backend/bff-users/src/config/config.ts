export default () => {
  return {
    environment: process.env.NODE_ENV || 'local',
    port: parseInt(process.env.PORT) || 3001,
    trace: process.env.DEBUG_TRACE || true,
    auth: {
      salt: process.env.AUTH_SALT || 'secret',
    },
    internTimeOut: 5000,
  };
};
