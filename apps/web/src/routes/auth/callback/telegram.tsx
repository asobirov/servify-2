import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/auth/callback/telegram")({
  component: TelegramAuthComponent,
});

function TelegramAuthComponent() {
  useEffect(() => {
    // Extract tgAuthResult from URL hash
    const hash = window.location.hash;
    const tgAuthResult = hash.replace("#tgAuthResult=", "");

    // Redirect to mobile app deep link
    if (tgAuthResult) {
      window.location.href = `servify://servify?tgAuthResult=${tgAuthResult}`;
    } else {
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="container mx-auto max-w-3xl px-4 py-8">
      <div className="text-center">
        <p className="text-lg">Redirecting...</p>
      </div>
    </div>
  );
}
