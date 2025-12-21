import type { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  version: "0.1.0",
  name: "servify",
  slug: "servify",
  scheme: "servify",
  owner: "asobirov",
  orientation: "portrait",
  icon: "./assets/icon-light.png",
  userInterfaceStyle: "automatic",
  updates: {
    fallbackToCacheTimeout: 0,
  },
  newArchEnabled: true,
  assetBundlePatterns: ["**/*"],
  ios: {
    bundleIdentifier: "uz.servify.app",
    supportsTablet: true,
    icon: {
      light: "./assets/icon.png",
      dark: "./assets/icon.png",
    },
    usesAppleSignIn: true,
    infoPlist: {
      ITSAppUsesNonExemptEncryption: false,
      NSAllowsArbitraryLoads:
        process.env.NODE_ENV === "development" || undefined,
    },
    associatedDomains: ["webcredentials:servify.uz"],
  },
  android: {
    package: "uz.servify.app",
    adaptiveIcon: {
      foregroundImage: "./assets/icon.png",
      backgroundColor: "#1F104A",
    },
    edgeToEdgeEnabled: true,
  },
  extra: {
    eas: {
      projectId: "de142bdc-0615-439e-a3f8-cf33f3274893",
    },
  },
  experiments: {
    reactServerFunctions: true,
    tsconfigPaths: true,
    typedRoutes: true,
  },
  plugins: [
    "expo-router",
    "expo-secure-store",
    "expo-web-browser",
    "expo-localization",
    "expo-font",
    "react-native-maps",
    [
      "expo-splash-screen",
      {
        backgroundColor: "#09090b",
        image: "./assets/splash-icon.png",
        dark: {
          backgroundColor: "#ffffff",
          image: "./assets/splash-icon.png",
        },
      },
    ],
  ],
});
