module.exports = {
    preset: "react-native",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    collectCoverageFrom: ["<rootDir>/src/**/*.{js,jsx,ts,tsx}"],
    coveragePathIgnorePatterns: [
        "<rootDir>/src/.*/index.ts",
        "<rootDir>/src/.*/constants.ts",
        "<rootDir>/src/.*/parent.ts",
        "<rootDir>/src/.*/*.test.i.*",
        "<rootDir>/src/dev/.*",
        "<rootDif>/src/service/.*",
    ],
    coverageThreshold: {
        global: {
            branches: 30,
            functions: 30,
            lines: 30,
            statements: 30,
        },
    },
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
            "<rootDir>/assetsTransformer.js",
        "\\.svg": "<rootDir>/src/__mocks__/svg.js",
        "\\.(css|less)$": "<rootDir>/assetsTransformer.js",
        "@src/(.*)": "<rootDir>/src/$1",
    },
    modulePaths: ["<rootDir>"],
    setupFiles: ["./node_modules/react-native-gesture-handler/jestSetup.js", "./setupTests.ts"],
    testMatch: ["<rootDir>/src/**/__tests__/**/*[^i].(js|ts|tsx)", "<rootDir>/src/**/?(*.)+(spec|test).(jsx?|tsx?)"],
    transform: {},
};
