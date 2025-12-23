import { authClient } from "@/lib/auth-client";

import Loader from "./loader";
import { Button } from "./ui/button";

export default function SignUpForm({ onSwitchToSignIn }: { onSwitchToSignIn: () => void }) {
  const { isPending } = authClient.useSession();

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="mx-auto w-full mt-10 max-w-md p-6">
      <Button
        variant="outline"
        className="w-full mt-4 border-gray-300"
        onClick={() => {
          authClient.signIn.social({
            provider: "google",
            callbackURL: `${window.location.origin}/`,
          });
        }}
      >
        Sign Up with Google
      </Button>
    </div>
  );
}
