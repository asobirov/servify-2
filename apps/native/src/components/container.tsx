import { type PropsWithChildren } from "react";
import { ScrollView, View, type ViewProps } from "react-native";
import Animated, { type AnimatedProps } from "react-native-reanimated";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { cn } from "@/utils/cn";

const AnimatedView = Animated.createAnimatedComponent(View);

type Props = ViewProps & {
  className?: string;
};

export function Container({ children, className, ...props }: PropsWithChildren<Props>) {
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      className={cn("flex-1 bg-background px-4 pt-4", className)}
      style={{ paddingBottom: insets.bottom }}
      {...props}
    >
      {children}
    </ScrollView>
  );
}
