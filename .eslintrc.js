module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: ['@react-native-community', 'prettier'],
  plugins: ['react', 'react-native', 'import', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
  globals: {
    __DEV__: true,
  },
  env: {
    'react-native/react-native': true,
  },
  settings: {
    flowtype: {
      onlyFilesWithFlowAnnotation: true,
    },
    parserOptions: {
      project: './jsconfig.js',
    },
  },
};
