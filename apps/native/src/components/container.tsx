import type { Edge, EdgeInsets } from "react-native-safe-area-context";

import { type PropsWithChildren } from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { cn } from "@/utils/cn";

const getPaddingStyle = (insets: EdgeInsets, edges?: Edge[]) => {
  if (!edges) return {};

  return {
    paddingBottom: edges.includes("bottom") ? insets.bottom : undefined,
    paddingTop: edges.includes("top") ? insets.top : undefined,
    paddingLeft: edges.includes("left") ? insets.left : undefined,
    paddingRight: edges.includes("right") ? insets.right : undefined,
  };
};

type ContainerScrollViewProps = React.ComponentProps<typeof ScrollView> & {
  edges?: Edge[];
  className?: string;
};

export function ContainerScrollView({
  children,
  className,
  edges = ["bottom"],
  ...props
}: PropsWithChildren<ContainerScrollViewProps>) {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      className={cn("flex-1 bg-background px-4 pt-4", className)}
      style={getPaddingStyle(insets, edges)}
      {...props}
    >
      {children}
    </ScrollView>
  );
}

type ContainerViewProps = React.ComponentProps<typeof View> & {
  edges?: Edge[];
  className?: string;
};

export function ContainerView({
  children,
  className,
  edges,
  ...props
}: PropsWithChildren<ContainerViewProps>) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className={cn("flex-1 bg-background px-4", className)}
      style={getPaddingStyle(insets, edges)}
      {...props}
    >
      {children}
    </View>
  );
}
