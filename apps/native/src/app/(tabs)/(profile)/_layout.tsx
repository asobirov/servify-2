import { Ionicons } from "@expo/vector-icons";
import { useLingui } from "@lingui/react/macro";
import { GlassContainer } from "expo-glass-effect";
import { Pressable } from "react-native";
import { withUniwind } from "uniwind";

import { Stack } from "@/components/stack";

const StyledIonicons = withUniwind(Ionicons);
const StyledGlassContainer = withUniwind(GlassContainer);

export default function ProfileLayout() {
  const { t } = useLingui();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: t`Profile`,
          //   headerLargeTitle: true,
          headerRight: () => <ProfileHeaderRight />,
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
      <Pressable className="p-1.5 pr-2.5" onPress={onSettingsPress}>
        <StyledIonicons name="settings-outline" size={20} className="text-foreground" />
      </Pressable>
      <Pressable className="p-1.5 pl-2.5" onPress={onSharePress}>
        <StyledIonicons name="share-outline" size={20} className="text-foreground" />
      </Pressable>
    </StyledGlassContainer>
  );
}
