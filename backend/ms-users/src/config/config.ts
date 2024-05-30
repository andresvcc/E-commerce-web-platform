/* eslint-disable max-len */
export default () => {
  return {
    name: 'api:thymio',
    environment: process.env.NODE_ENV || 'local',
    port: parseInt(process.env.PORT) || 3002,
    trace: process.env.DEBUG_TRACE || true,
    auth: {
      salt: process.env.AUTH_SALT || 'secret',
    },
    mongo: {
      url:
        process.env.MONGODB_ADDON_URI ||
        'mongodb://root:Pass4MONGO.38.242.195.225.2023@38.242.195.225:27017/thymio?retryWrites=true&connectTimeoutMS=10000&authSource=admin&authMechanism=SCRAM-SHA-1',
    },
    internTimeOut: 5000,
  };
};
