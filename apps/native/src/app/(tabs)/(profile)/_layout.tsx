import { Ionicons } from "@expo/vector-icons";
import { useLingui } from "@lingui/react/macro";
import { GlassContainer } from "expo-glass-effect";
import { Link } from "expo-router";
import { Pressable } from "react-native";
import { withUniwind } from "uniwind";

import { Stack } from "@/components/stack";

const StyledIonicons = withUniwind(Ionicons);
const StyledGlassContainer = withUniwind(GlassContainer);

export default function ProfileLayout() {
  const { t } = useLingui();

  return (
    <Stack
      screenOptions={{
        headerLargeTitleEnabled: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: t`Profile`,
          headerTitleStyle: {
            color: "transparent",
          },
          headerRight: () => <ProfileHeaderRight />,
        }}
      />

      <Stack.Screen
        name="settings/index"
        options={{
          headerTitle: t`Settings`,
        }}
      />
      <Stack.Screen
        name="settings/appearance"
        options={{
          headerTitle: t`Appearance`,
        }}
      />
      <Stack.Screen
        name="settings/language"
        options={{
          headerTitle: t`App Language`,
        }}
      />
      <Stack.Screen
        name="settings/notifications"
        options={{
          headerTitle: t`Notifications`,
        }}
      />
    </Stack>
  );
}

function ProfileHeaderRight() {
  const onSettingsPress = () => {
    console.log("settings");
  };

  const onSharePress = () => {
    console.log("share");
  };

  return (
    <StyledGlassContainer spacing={10} className="flex-row items-center">
      <Link href="/(tabs)/(profile)/settings" asChild>
        <Pressable className="p-1.5 pr-2.5" onPress={onSettingsPress}>
          <StyledIonicons name="settings-outline" size={20} className="text-foreground" />
        </Pressable>
      </Link>
      <Pressable className="p-1.5 pl-2.5" onPress={onSharePress}>
        <StyledIonicons name="share-outline" size={20} className="text-foreground" />
      </Pressable>
    </StyledGlassContainer>
  );
}
