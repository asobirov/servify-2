import { useLingui } from "@lingui/react/macro";

import { Stack } from "@/components/stack";
import { ThemeToggle } from "@/components/theme-toggle";

export default function ProfileLayout() {
  const { t } = useLingui();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerTitle: t`Profile`,
          //   headerLargeTitle: true,
          headerRight: () => <ThemeToggle />,
        }}
      />
    </Stack>
  );
}
