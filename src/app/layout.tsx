import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";

const fontSans = FontSans({ 
  subsets: ["latin"], 
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "ADmyBRAND Insights - Analytics Dashboard",
  description: "Modern analytics dashboard for digital marketing agencies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          defaultTheme="system"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
