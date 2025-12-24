import { Ionicons } from "@expo/vector-icons";
import { useLingui } from "@lingui/react/macro";
import { useRouter } from "expo-router";
import { Accordion } from "heroui-native";
import { Text } from "react-native";
import { withUniwind } from "uniwind";

import { ContainerScrollView } from "@/components/container";

import { ThemeLabel } from "./appearance";
import { LanguageLabel } from "./language";

const StyledIonicons = withUniwind(Ionicons);

type SettingsPage = {
  title: string;
  path: string;
  value?: () => React.ReactNode;
};

export default function SettingsScreen() {
  const router = useRouter();
  const { t } = useLingui();

  const settingsPages = [
    {
      title: t`Appearance`,
      path: "appearance" as const,
      value: () => <ThemeLabel />,
    },
    {
      title: t`App Language`,
      path: "language" as const,
      value: () => <LanguageLabel />,
    },
    {
      title: t`Notifications`,
      path: "notifications" as const,
    },
  ] satisfies SettingsPage[];

  const handlePress = (path: (typeof settingsPages)[number]["path"]) => {
    router.push(`/(tabs)/(profile)/settings/${path}`);
  };
  return (
    <ContainerScrollView>
      <Accordion isCollapsible={false} variant="surface">
        {settingsPages.map((page) => (
          <Accordion.Item key={page.title} value={page.title}>
            <Accordion.Trigger onPress={() => handlePress(page.path)}>
              <Text className="text-foreground">{page.title}</Text>
              <Accordion.Indicator className="flex-row">
                {page.value && <Text className="text-muted pr-1">{page.value()}</Text>}
                <StyledIonicons name="chevron-forward" size={16} className="text-muted" />
              </Accordion.Indicator>
            </Accordion.Trigger>
          </Accordion.Item>
        ))}
      </Accordion>
    </ContainerScrollView>
  );
}
