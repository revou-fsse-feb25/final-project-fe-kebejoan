import type { Metadata } from "next";
import "../globals.css";
import AppSidebar from "@/components/AppSidebar";
import NavBar from "@/components/NavBar";
import { ThemeProvider } from "@/components/providers/ThemeProviders";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import SessionProviderWrapper from "@/components/wrapper/SessionProviderWrapper";

// const geistSans = Geist({
// 	variable: "--font-geist-sans",
// 	subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
// 	variable: "--font-geist-mono",
// 	subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Eng Tracker | Engineering Tracker Portal",
  description: "Engineering Tracker Portal",
};

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <>
      <SessionProviderWrapper>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <main className="w-full">
              <NavBar />
              <div className="px-4">{children}</div>
            </main>
          </SidebarProvider>
        </ThemeProvider>
      </SessionProviderWrapper>
    </>
  );
}
