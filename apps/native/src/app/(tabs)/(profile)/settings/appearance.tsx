import { Trans } from "@lingui/react/macro";
import { Divider, RadioGroup, Surface } from "heroui-native";
import { Fragment } from "react";

import { ContainerScrollView } from "@/components/container";
import { SUPPORTED_THEMES, useAppTheme } from "@/contexts/app-theme-context";

export default function LanguageScreen() {
  const { currentTheme, setTheme, isSupportedTheme, hasAdaptiveThemes } = useAppTheme();

  const handleThemeChange = (value: string) => {
    if (!isSupportedTheme(value)) {
      console.warn(`Unsupported theme: ${value}`);
      return;
    }

    setTheme(value);
  };

  const getThemeValue = () => {
    if (hasAdaptiveThemes) {
      return "system";
    }

    return currentTheme;
  };

  return (
    <ContainerScrollView>
      <Surface>
        <RadioGroup value={getThemeValue()} onValueChange={handleThemeChange}>
          {SUPPORTED_THEMES.map((theme) => (
            <Fragment key={theme}>
              <RadioGroup.Item value={theme}>{theme}</RadioGroup.Item>
              {theme !== SUPPORTED_THEMES[SUPPORTED_THEMES.length - 1] && <Divider />}
            </Fragment>
          ))}
        </RadioGroup>
      </Surface>
    </ContainerScrollView>
  );
}

export const ThemeLabel = () => {
  const { hasAdaptiveThemes, currentTheme } = useAppTheme();
  if (hasAdaptiveThemes) {
    return <Trans>System</Trans>;
  }
  return <Trans>{currentTheme}</Trans>;
};
