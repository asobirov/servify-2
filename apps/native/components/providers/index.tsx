import { LinguiClientProvider } from "./lingui-client-provider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <LinguiClientProvider>
            {children}
        </LinguiClientProvider>
    );
}