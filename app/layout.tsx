"use client"
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/lib/utils"
import "./globals.css";
import LefBar from "@/components/leftbar";
import Header from "@/components/header";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { SessionProvider } from "next-auth/react";
import { ScrollArea } from "@/components/ui/scroll-area";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="pt-br">
      <SessionProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          themes={['light', 'dark']}
        >
          <TooltipProvider>
            <body className={cn("min-h-screen w-full overflow-hidden", fontSans.variable)}>
              <div className="flex flex-col min-h-screen">
                <div className="grid flex-1 h-full w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
                  <LefBar />
                  <div className="flex flex-col h-full">
                    <Header />
                    <ScrollArea className="h-screen w-full">
                      <main className="flex-1">
                        {children}
                      </main>
                    </ScrollArea>
                  </div>
                </div>
              </div>
            </body>

          </TooltipProvider>
        </ThemeProvider>
      </SessionProvider>
    </html>
  );
}