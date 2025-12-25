import { Ionicons } from "@expo/vector-icons";
import { LegendList } from "@legendapp/list";
import { Trans } from "@lingui/react/macro";
import { useQuery } from "@tanstack/react-query";
import { Card, Chip, useThemeColor } from "heroui-native";
import { Text, View, ScrollView } from "react-native";

import { ContainerView } from "@/components/container";
import { useSelectedCategory } from "@/store/service/category/use-selected-category";
import { cn } from "@/utils/cn";
import { trpc } from "@/utils/trpc";

export default function Home() {
  const healthCheck = useQuery(trpc.healthCheck.queryOptions());
  const privateData = useQuery(trpc.privateData.queryOptions());
  const isConnected = healthCheck?.data === "OK";
  const isLoading = healthCheck?.isLoading;

  const mutedColor = useThemeColor("muted");
  const successColor = useThemeColor("success");
  const dangerColor = useThemeColor("danger");

  return (
    <ScrollView className="flex-1 bg-background">
      <ServiceCategoriesHList className="mb-4" />
      <ContainerView>
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
      </ContainerView>
    </ScrollView>
  );
}

const ServiceCategoriesHList = ({ className }: { className?: string }) => {
  const { data: categories, isLoading } = useQuery(
    trpc.service.category.getCategories.queryOptions({
      limit: 10,
      page: 1,
    }),
  );

  if (isLoading) {
    return <Text className="text-foreground text-base">Loading...</Text>;
  }

  return (
    <>
      <LegendList
        data={categories ?? []}
        horizontal
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerClassName={cn("px-4")}
        className={className}
        keyExtractor={(item) => item.slug}
        renderItem={({ item }) => (
          <ServiceCategoryChip name={item.name} slug={item.slug} isActive={item.isActive} />
        )}
      />
    </>
  );
};

const ServiceCategoryChip = ({
  name,
  slug,
  isActive,
}: {
  name: string;
  slug: string;
  isActive: boolean;
}) => {
  const { selectedCategorySlug, setSelectedCategorySlug } = useSelectedCategory();

  const handleCategorySelect = (categorySlug: string) => {
    if (categorySlug === selectedCategorySlug) {
      setSelectedCategorySlug(null);
      return;
    }

    setSelectedCategorySlug(categorySlug);
  };

  const isSelected = selectedCategorySlug === slug;

  return (
    <View className={cn("pr-2")}>
      <Chip
        color="default"
        disabled={isActive}
        variant="primary"
        size="lg"
        className="h-8"
        onPress={() => handleCategorySelect(slug)}
      >
        {name}
      </Chip>
    </View>
  );
};
