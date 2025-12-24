import { Trans } from "@lingui/react/macro";
import { LOCALES, SupportedLocales } from "@servify/i18n/languages";
import { Divider, RadioGroup, Surface } from "heroui-native";
import { Fragment } from "react";
import { View } from "react-native";

import { Container } from "@/components/container";
import { useAppLanguage } from "@/store/use-app-language-store";
import { cn } from "@/utils/cn";

export default function LanguageScreen() {
  const { language, setLanguage } = useAppLanguage();

  const handleLanguageChange = (value: string) => {
    setLanguage(value as SupportedLocales);
  };

  const getLanguageValue = () => {};

  return (
    <Container>
      <Surface>
        <RadioGroup value={language} onValueChange={handleLanguageChange}>
          {LOCALES.map((locale, i) => (
            <Fragment key={locale}>
              <RadioGroup.Item value={locale}>
                <View className="flex-1">
                  <RadioGroup.Label>{locale}</RadioGroup.Label>
                  <RadioGroup.Description>{locale}</RadioGroup.Description>
                </View>
                <RadioGroup.Indicator>
                  <RadioGroup.IndicatorThumb className="size-3.5" />
                </RadioGroup.Indicator>
              </RadioGroup.Item>
              {i < LOCALES.length - 1 && <Divider />}
            </Fragment>
          ))}
        </RadioGroup>
      </Surface>
    </Container>
  );
}

export const LanguageLabel = () => {
  const { language } = useAppLanguage();

  return <Trans>{language}</Trans>;
};
