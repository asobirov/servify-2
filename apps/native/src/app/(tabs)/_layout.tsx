import { useLingui } from "@lingui/react/macro";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";
import { View } from "react-native";

export default function TabLayout() {
  const { t } = useLingui();
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="(home)">
        <Label hidden>{t`Home`}</Label>
        <Icon sf={"house"} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="two">
        <Label hidden>{t`Explore`}</Label>
        <Icon sf={"compass.drawing"} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="search" role="search">
        <Label>Search</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
