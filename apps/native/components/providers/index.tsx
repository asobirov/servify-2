import { QueryClientProvider } from "@tanstack/react-query";
import { LinguiClientProvider } from "./lingui-client-provider";
import { queryClient } from "@/utils/trpc";
import { HeroUINativeProvider } from "heroui-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";

import { AppThemeProvider } from "@/contexts/app-theme-context";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <LinguiClientProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <KeyboardProvider>
            <AppThemeProvider>
              <HeroUINativeProvider>{children}</HeroUINativeProvider>
            </AppThemeProvider>
          </KeyboardProvider>
        </GestureHandlerRootView>
      </LinguiClientProvider>
    </QueryClientProvider>
  );
};
