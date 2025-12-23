import "@/polyfills";
import "@/global.css";

import { Stack } from "expo-router";

import { Providers } from "@/components/providers";

export const unstable_settings = {
  initialRouteName: "(drawer)",
};

function StackLayout() {
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
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
