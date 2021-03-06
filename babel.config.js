module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
      ["@babel/plugin-proposal-decorators", { legacy: true }],
    ],
    env: {
        test: {
            plugins: [["dynamic-import-node"], ["@babel/plugin-transform-runtime"]],
        },
        development: {},
        nonprod: {},
        production: {},
    },
};
