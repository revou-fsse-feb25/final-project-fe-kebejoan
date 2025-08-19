"use client";
import { usePathname } from "next/navigation";
import { ThemeProvider } from "../providers/ThemeProviders";
import { SidebarProvider } from "../ui/sidebar";
import AppSidebar from "../AppSidebar";
import NavBar from "../NavBar";
import { cookies } from "next/headers";

export default async function LayoutWrapper({
  children,
  defaultOpen,
}: {
  children: React.ReactNode;
  defaultOpen: boolean;
}) {
  const pathname = usePathname();
  const hideComponent = ["/login", "/register"].includes(pathname);

  return (
    <>
      {hideComponent ? (
        <main className="w-full">
          <div className="px-4">{children}</div>
        </main>
      ) : (
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
      )}
    </>
  );
}
