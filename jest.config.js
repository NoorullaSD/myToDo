module.exports = {
  preset: '@react-native/jest-preset',

  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    './jest.setup.js',
  ],

  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@react-native-async-storage|@reduxjs/toolkit|react-redux|immer)/)',
  ],
};