import { Ionicons } from "@expo/vector-icons";
import { Trans, useLingui } from "@lingui/react/macro";
import { Link, Stack } from "expo-router";
import { useThemeColor } from "heroui-native";
import { Pressable } from "react-native";
import Animated from "react-native-reanimated";
import { withUniwind } from "uniwind";

import { ThemeToggle } from "@/components/theme-toggle";

const StyledIonicons = withUniwind(Ionicons);

export default function HomeLayout() {
  const themeColorForeground = useThemeColor("foreground");
  const themeColorBackground = useThemeColor("background");

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
          headerLeft: () => (
            <Link href="/(tabs)/(home)/modal" asChild>
              <Pressable className="flex items-center justify-center">
                <Animated.View key="modal" className={"items-center justify-center"}>
                  <StyledIonicons name="information-circle-outline" size={20} className="text-foreground" />
                </Animated.View>
              </Pressable>
            </Link>
          ),
        }}
      />
    </Stack>
  );
}
