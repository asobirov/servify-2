import { Avatar, Card } from "heroui-native";
import { Image, Pressable, Text } from "react-native";

import { ContainerScrollView } from "@/components/container";
import { SignIn } from "@/components/sign-in";
import { SignUp } from "@/components/sign-up";
import { authClient } from "@/lib/auth-client";
import { queryClient } from "@/utils/trpc";

export default function Profile() {
  const { data: session } = authClient.useSession();

  return (
    <ContainerScrollView>
      {session?.user ? (
        <Card variant="secondary" className="mb-6 p-4">
          <Avatar alt={session.user.name}>
            <Avatar.Image source={{ uri: session.user.image }} />
            <Avatar.Fallback className="bg-accent-soft" color="default">
              {session.user.name.charAt(0)}
            </Avatar.Fallback>
          </Avatar>
          <Text className="text-foreground text-base mb-2">
            Welcome, <Text className="font-medium">{session.user.name}</Text>
          </Text>
          <Text className="text-muted text-sm mb-4">{session.user.email}</Text>
          <Pressable
            className="bg-danger py-3 px-4 rounded-lg self-start active:opacity-70"
            onPress={() => {
              authClient.signOut();
              queryClient.invalidateQueries();
            }}
          >
            <Text className="text-foreground font-medium">Sign Out</Text>
          </Pressable>
        </Card>
      ) : null}
      {!session?.user && (
        <>
          <SignIn />
          <SignUp />
        </>
      )}
    </ContainerScrollView>
  );
}
