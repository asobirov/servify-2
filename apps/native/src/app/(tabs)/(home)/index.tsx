import { Ionicons } from "@expo/vector-icons";
import { Trans } from "@lingui/react/macro";
import { useQueries, useQuery } from "@tanstack/react-query";
import { Card, Chip, useThemeColor } from "heroui-native";
import { Text, View, Pressable } from "react-native";

import { Container } from "@/components/container";
import { SignIn } from "@/components/sign-in";
import { SignUp } from "@/components/sign-up";
import { authClient } from "@/lib/auth-client";
import { queryClient, trpc } from "@/utils/trpc";

export default function Home() {
  const healthCheck = useQuery(trpc.healthCheck.queryOptions());
  const privateData = useQuery(trpc.privateData.queryOptions());
  const isConnected = healthCheck?.data === "OK";
  const isLoading = healthCheck?.isLoading;
  const { data: session } = authClient.useSession();

  const mutedColor = useThemeColor("muted");
  const successColor = useThemeColor("success");
  const dangerColor = useThemeColor("danger");

  return (
    <Container>
      <ServiceCategoriesHList />
      {session?.user ? (
        <Card variant="secondary" className="mb-6 p-4">
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

      <Card variant="secondary" className="p-4">
        <View className="flex-row items-center justify-between mb-4">
          <Card.Title>
            <Trans>System Status</Trans>
          </Card.Title>
          <Chip variant="secondary" color={isConnected ? "success" : "danger"} size="sm">
            <Chip.Label>{isConnected ? "LIVE" : "OFFLINE"}</Chip.Label>
          </Chip>
        </View>

        <Card className="p-4">
          <View className="flex-row items-center">
            <View
              className={`w-3 h-3 rounded-full mr-3 ${isConnected ? "bg-success" : "bg-muted"}`}
            />
            <View className="flex-1">
              <Text className="text-foreground font-medium mb-1">TRPC Backend</Text>
              <Card.Description>
                {isLoading
                  ? "Checking connection..."
                  : isConnected
                    ? "Connected to API"
                    : "API Disconnected"}
              </Card.Description>
            </View>
            {isLoading && <Ionicons name="hourglass-outline" size={20} color={mutedColor} />}
            {!isLoading && isConnected && (
              <Ionicons name="checkmark-circle" size={20} color={successColor} />
            )}
            {!isLoading && !isConnected && (
              <Ionicons name="close-circle" size={20} color={dangerColor} />
            )}
          </View>
        </Card>
      </Card>

      <Card variant="secondary" className="mt-6 p-4">
        <Card.Title className="mb-3">Private Data</Card.Title>
        {privateData && <Card.Description>{privateData.data?.message}</Card.Description>}
      </Card>
      <Card variant="secondary" className="mt-6 p-4">
        <Card.Title className="mb-3">Extra Long Text</Card.Title>
        <Card.Description>
          {Array.from({ length: 1000 }).map((_, index) => (
            <Text key={index}>{index}</Text>
          ))}
        </Card.Description>
      </Card>

      {!session?.user && (
        <>
          <SignIn />
          <SignUp />
        </>
      )}
    </Container>
  );
}

const ServiceCategoriesHList = () => {
  const { data: categories } = useQuery(trpc.service.category.getCategories.queryOptions());

  return (
    <View>
      {categories?.map((category) => (
        <Text key={category.id}>{category.name}</Text>
      ))}
    </View>
  );
};
