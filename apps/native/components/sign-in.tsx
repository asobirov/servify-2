import { Ionicons } from "@expo/vector-icons";
import * as WebBrowser from "expo-web-browser";
import { Card, Button } from "heroui-native";
import { withUniwind } from "uniwind";

import { env } from "@/env";

const StyledIonicons = withUniwind(Ionicons);

import { useCallback } from "react";

import { authClient } from "@/lib/auth-client";

export function SignIn() {
  const mutedColor = useThemeColor("muted");
  const accentColor = useThemeColor("accent");
  const foregroundColor = useThemeColor("foreground");
  const dangerColor = useThemeColor("danger");

  return (
    <>
      <Card className="gap-2">
        <Button
          variant="secondary"
          className="flex flex-row justify-between"
          onPress={() =>
            authClient.signIn.social({
              provider: "google",
              callbackURL: `/`,
            })
          }
        >
          <StyledIonicons name="logo-google" size={16} className="-mr-4 text-foreground" />
          <Button.Label className="self-center mx-auto text-foreground">
            Sign In with Google
          </Button.Label>
        </Button>
      </Card>
    </>
  );
}

export function SignInWithTelegram() {
  const getTelegramCallbackURL = () => {
    const url = new URL("https://oauth.telegram.org/auth");
    url.searchParams.set("bot_id", env.EXPO_PUBLIC_TELEGRAM_BOT_ID.toString());
    url.searchParams.set("origin", env.EXPO_PUBLIC_TELEGRAM_CALLBACK_URL);
    url.searchParams.set("embed", "1");
    url.searchParams.set("request_access", "write");
    url.searchParams.set("return_to", env.EXPO_PUBLIC_TELEGRAM_CALLBACK_URL);

    return url.toString();
  };

  const handlePress = async () => {
    const result = await WebBrowser.openAuthSessionAsync(getTelegramCallbackURL(), "servify://");

    if (result.type !== "success") {
      return;
    }

    const resultURL = new URL(result.url);

    const user = JSON.parse(atob(resultURL.searchParams.get("tgAuthResult") || "") || "{}");

    await authClient.signIn.telegram(user as any);
  };
  return (
    <Button variant="secondary" className="flex flex-row justify-between" onPress={handlePress}>
      <StyledIonicons name="paper-plane" size={16} className="-mr-4 text-foreground" />
      <Button.Label className="self-center mx-auto text-foreground">
        Sign In with Telegram
      </Button.Label>
    </Button>
  );
}
