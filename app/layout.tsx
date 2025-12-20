import type { Metadata } from "next";
import { Inter } from "next/font/google";
// @ts-expect-error: Allow side-effect CSS import without module/type declarations
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DreamHomes Properties Admin Dashboard",
  description: "Admin dashboard for managing DreamHomes real estate listings",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        layout: {
          socialButtonsVariant: "iconButton",
        },
        variables: {
          colorPrimary: "#111827",
        },
      }}
    >
      <html lang="en">
        <body
          className={`${inter.className} antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
