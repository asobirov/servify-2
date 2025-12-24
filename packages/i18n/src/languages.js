"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSupportedLocale = exports.DEFAULT_LOCALE = exports.LOCALES = void 0;
exports.LOCALES = ["en", "ru", "uz"];
exports.DEFAULT_LOCALE = "en";
/**
 * Validates whether a locale is supported. If not, the default locale will be used.
 */
var isSupportedLocale = function (locale) {
  return exports.LOCALES.includes(locale);
};
exports.isSupportedLocale = isSupportedLocale;
