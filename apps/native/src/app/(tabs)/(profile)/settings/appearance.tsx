import { Trans } from "@lingui/react/macro";
import { RadioGroup } from "heroui-native";

import { Container } from "@/components/container";
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
    <Container>
      <RadioGroup value={getThemeValue()} onValueChange={handleThemeChange}>
        {SUPPORTED_THEMES.map((theme) => (
          <RadioGroup.Item key={theme} value={theme}>
            {theme}
          </RadioGroup.Item>
        ))}
      </RadioGroup>
    </Container>
  );
}

export const ThemeLabel = () => {
  const { hasAdaptiveThemes, currentTheme } = useAppTheme();
  if (hasAdaptiveThemes) {
    return <Trans>System</Trans>;
  }
  return <Trans>{currentTheme}</Trans>;
};
