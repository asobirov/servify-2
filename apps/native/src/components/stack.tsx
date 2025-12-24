import { Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import { Stack as ExpoStack, useRouter } from "expo-router";
import { useThemeColor } from "heroui-native";
import React from "react";
import { Pressable, View } from "react-native";
import { withUniwind } from "uniwind";

const DEFAULT_STACK_HEADER = ({
  headerTextColor,
  backgroundColor,
  isLiquidGlassAvailable,
}: {
  headerTextColor: string;
  backgroundColor?: string;
  isLiquidGlassAvailable: boolean;
}): NativeStackNavigationOptions =>
  process.env.EXPO_OS !== "ios"
    ? {}
    : {
        contentStyle: {
          backgroundColor: backgroundColor,
        },
        headerTransparent: true,
        headerBlurEffect: isLiquidGlassAvailable ? undefined : "systemChromeMaterial",
        headerShadowVisible: true,
        headerLargeTitleShadowVisible: false,
        headerLargeStyle: {
          backgroundColor: "transparent",
        },
        headerLargeTitle: true,
        headerTintColor: headerTextColor,
        headerTitleStyle: {
          color: headerTextColor,
        },
        headerLargeTitleStyle: { color: headerTextColor },
      };

/** Create a bottom sheet on iOS with extra snap points (`sheetAllowedDetents`) */
export const BOTTOM_SHEET: NativeStackNavigationOptions = {
  // https://github.com/software-mansion/react-native-screens/blob/main/native-stack/README.md#sheetalloweddetents
  presentation: "formSheet",
  gestureDirection: "vertical",
  animation: "slide_from_bottom",
  sheetGrabberVisible: true,
  sheetInitialDetentIndex: 0,
  sheetAllowedDetents: [0.5, 1.0],
};

const StyledIonicons = withUniwind(Ionicons);

export function Stack({
  screenOptions,
  children,
  ...props
}: React.ComponentProps<typeof ExpoStack>) {
  const router = useRouter();

  const headerTextColor = useThemeColor("foreground");
  const backgroundColor = useThemeColor("background");

  const processedChildren = React.Children.map(children, (child: React.ReactNode) => {
    if (!React.isValidElement<StackScreenProps>(child)) {
      return child;
    }

    const { sheet, modal, ...props } = child.props;
    if (sheet) {
      return React.cloneElement(child, {
        ...props,
        options: {
          ...BOTTOM_SHEET,
          ...props.options,
        },
      });
    } else if (modal) {
      return React.cloneElement(child, {
        ...props,
        options: {
          presentation: "modal",
          headerLargeTitle: false,
          headerRight: () => (
            <Pressable onPress={() => router.back()}>
              <View className="flex items-center justify-center">
                <StyledIonicons name="close-circle" size={20} className="text-foreground" />
              </View>
            </Pressable>
          ),
          ...props.options,
        },
      });
    }
    return child;
  });

  return (
    <ExpoStack
      screenOptions={{
        ...DEFAULT_STACK_HEADER({
          isLiquidGlassAvailable: isLiquidGlassAvailable(),
          headerTextColor: `${headerTextColor}`,
          backgroundColor: `${backgroundColor}`,
        }),
        ...screenOptions,
      }}
      {...props}
      children={processedChildren}
    />
  );
}

type StackScreenProps = React.ComponentProps<typeof ExpoStack.Screen> & {
  /** Make the sheet open as a bottom sheet with default options on iOS. */
  sheet?: boolean;
  /** Make the screen open as a modal. */
  modal?: boolean;
};

Stack.Screen = ExpoStack.Screen as React.FC<StackScreenProps>;

Stack.Protected = ExpoStack.Protected;
