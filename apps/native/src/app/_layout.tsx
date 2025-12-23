import "@/polyfills";
import "@/global.css";
import { Stack } from "expo-router";
import { useThemeColor } from "heroui-native";

import { Providers } from "@/components/providers";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

function StackLayout() {
  const themeColorForeground = useThemeColor("foreground");
  const themeColorBackground = useThemeColor("background");

  return (
    <Stack
      screenOptions={{
        headerTintColor: themeColorForeground,
        headerStyle: { backgroundColor: themeColorBackground },
        headerTitleStyle: { color: themeColorForeground },
        contentStyle: { backgroundColor: themeColorBackground },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ title: "Modal", presentation: "modal" }} />
    </Stack>
  );
}

export default function Layout() {
  return (
    <Providers>
      <StackLayout />
    </Providers>
  );
}
