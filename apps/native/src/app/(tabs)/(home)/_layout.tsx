import { Trans, useLingui } from "@lingui/react/macro";
import { Stack } from "expo-router";
import { useThemeColor } from "heroui-native";

import { ThemeToggle } from "@/components/theme-toggle";

export default function HomeLayout() {
  const themeColorForeground = useThemeColor("foreground");

  const { t } = useLingui();

  return (
    <Stack
      screenOptions={{
        headerTransparent: true,
        headerShadowVisible: true,
        headerLargeTitleShadowVisible: false,
        headerLargeStyle: {
          backgroundColor: "transparent",
        },
        headerLargeTitleStyle: { color: themeColorForeground },

        headerTintColor: themeColorForeground,
        headerTitleStyle: { color: themeColorForeground },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: t`Home`,
          //   headerLargeTitle: true,
          headerRight: () => <ThemeToggle />,
        }}
      />
    </Stack>
  );
}
