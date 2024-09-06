module.exports = {
  presets: ['module:@react-native/babel-preset'],
  "plugins": [
    ["module-resolver", {
      "@": ["./src"],
      "alias": {
        "test": "./test",
        "underscore": "lodash"
      }
    }]
  ],
};
