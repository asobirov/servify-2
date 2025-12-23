import { Card, Button } from "heroui-native";
import { Ionicons } from "@expo/vector-icons";
import { withUniwind } from "uniwind";
import * as WebBrowser from "expo-web-browser";

const StyledIonicons = withUniwind(Ionicons);

import { authClient } from "@/lib/auth-client";
import { useCallback } from "react";

function SignIn() {
  const telegramSignIn = useCallback(async () => {
    const result = await WebBrowser.openAuthSessionAsync(
      "https://oauth.telegram.org/auth?bot_id=8361741979&origin=https://ready-geckos-write.loca.lt/telegram&embed=1&request_access=write&return_to=https://ready-geckos-write.loca.lt/telegram",
      "servify://",
    );

    if (result.type !== "success") {
      return;
    }

    const resultURL = new URL(result.url);

    const user = JSON.parse(atob(resultURL.searchParams.get("tgAuthResult") || "") || "{}");

    await authClient.signIn.telegram(user as any);
  }, []);

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

        <Button
          variant="secondary"
          className="flex flex-row justify-between"
          onPress={telegramSignIn}
        >
          <StyledIonicons name="paper-plane" size={16} className="-mr-4 text-foreground" />
          <Button.Label className="self-center mx-auto text-foreground">
            Sign In with Telegram
          </Button.Label>
        </Button>
      </Card>
    </>
  );
}

export { SignIn };
