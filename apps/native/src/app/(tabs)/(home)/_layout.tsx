import { Ionicons } from "@expo/vector-icons";
import { useLingui } from "@lingui/react/macro";
import { Link } from "expo-router";
import { Pressable } from "react-native";
import Animated from "react-native-reanimated";
import { withUniwind } from "uniwind";

import { Stack } from "@/components/stack";
import { ThemeToggle } from "@/components/theme-toggle";

const StyledIonicons = withUniwind(Ionicons);

export default function HomeLayout() {
  const { t } = useLingui();

  return (
    <Stack>
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
                  <StyledIonicons
                    name="information-circle-outline"
                    size={20}
                    className="text-foreground"
                  />
                </Animated.View>
              </Pressable>
            </Link>
          ),
        }}
      />
    </Stack>
  );
}
