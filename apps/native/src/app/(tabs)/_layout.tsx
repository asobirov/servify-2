import { useLingui } from "@lingui/react/macro";
import { Icon, Label, NativeTabs } from "expo-router/unstable-native-tabs";

export default function TabLayout() {
  const { t } = useLingui();
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="(home)">
        <Label hidden>{t`Home`}</Label>
        <Icon sf={"house"} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="appointments">
        <Label hidden>{t`Appointments`}</Label>
        <Icon sf={"calendar"} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="(profile)">
        <Label hidden>{t`Profile`}</Label>
        <Icon sf={"person"} />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="search" role="search">
        <Label>Search</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
