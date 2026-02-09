import type { Metadata } from "next";

import { Providers } from "@/components/providers";

import "@/app.css";

export const metadata: Metadata = {
    title: "Hack My Heart",
    description: "Jeu interactif de défis en cybersécurité pour la Saint-Valentin",
    icons: {
        icon: "/favicon.svg",
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr">
            <body className="bg-background text-foreground antialiased">
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}