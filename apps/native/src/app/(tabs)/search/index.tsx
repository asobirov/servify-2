import { Text, View } from "react-native";

import { ContainerScrollView } from "@/components/container";

export default function Search() {
  return (
    <ContainerScrollView>
      <Text className="text-foreground">Search</Text>
    </ContainerScrollView>
  );
}
