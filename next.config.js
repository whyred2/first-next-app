// next.config.js
module.exports = {
    webpack(config, { dev, isServer }) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });
        if (!dev) {
            config.devtool = false;
        }
        return config;
    },
};
