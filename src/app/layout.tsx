import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

export const metadata: Metadata = {
  title: "Homenest",
  description: "Find Homes at your conform zone.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
	<html lang="en">
		<AppRouterCacheProvider>
			<body className={'bg-slate-200'}>{children}</body>
		</AppRouterCacheProvider>
    </html>
  );
}
