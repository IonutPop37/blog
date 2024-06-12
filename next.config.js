module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        'child_process': false,
        'worker_threads': false,
        'node-fetch': false,
        'fetch-blob': false,
        'node-domexception': false,
        'execa': false,
      };
    }

    return config;
  },
};
