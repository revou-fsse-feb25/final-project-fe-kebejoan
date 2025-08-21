import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Eng Tracker | Engineering Tracker Portal",
	description: "Engineering Tracker Portal",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased flex`}
			>
				{/* <LayoutWrapper defaultOpen={defaultOpen}>{children}</LayoutWrapper> */}
				{/* <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar /> */}
				<main className="w-full">
					{/* <NavBar /> */}
					<div className="px-4">{children}</div>
				</main>
				<Toaster />
				{/* </SidebarProvider>
        </ThemeProvider> */}
			</body>
		</html>
	);
}
