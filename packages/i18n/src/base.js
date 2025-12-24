"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var languages_1 = require("./languages");
var config = {
  locales: languages_1.LOCALES,
  pseudoLocale: "pseudo",
  sourceLocale: languages_1.DEFAULT_LOCALE,
  fallbackLocales: {
    default: languages_1.DEFAULT_LOCALE,
  },
  orderBy: "origin",
};
exports.default = config;
