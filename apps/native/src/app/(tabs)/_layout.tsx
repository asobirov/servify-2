import { useLingui } from "@lingui/react/macro";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";

export default function TabLayout() {
  const { t } = useLingui();
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="(home)">
        <Label>{t`Home`}</Label>
        <Icon sf={"house"} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="two">
        <Label>{t`Explore`}</Label>
        <Icon sf={"compass.drawing"} />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
