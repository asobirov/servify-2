import { Link, Redirect } from "expo-router";
import { Pressable, Text } from "react-native";

import { ContainerScrollView } from "@/components/container";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const { data: session } = authClient.useSession();

  return (
    <ContainerScrollView>
      <Text className="text-foreground">session: {JSON.stringify(session, null, 2)}</Text>
      <Link href="/(tabs)/auth" asChild>
        <Pressable>
          <Text className="text-foreground">Sign Out</Text>
        </Pressable>
      </Link>
    </ContainerScrollView>
  );
}
