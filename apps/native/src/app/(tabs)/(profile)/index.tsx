import { Text } from "react-native";

import { Container } from "@/components/container";
import { authClient } from "@/lib/auth-client";

export default function Home() {
  const { data: session } = authClient.useSession();
  return (
    <Container>
      <Text className="text-foreground">session: {JSON.stringify(session, null, 2)}</Text>
    </Container>
  );
}
