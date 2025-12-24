import { useLingui } from "@lingui/react/macro";

import { Stack } from "@/components/stack";

export default function HomeLayout() {
  const { t } = useLingui();

  return (
    <Stack>
      <Stack.Screen
        name="index"
        modal
        options={{
          headerTitle: t`Auth`,
        }}
      />
    </Stack>
  );
}
