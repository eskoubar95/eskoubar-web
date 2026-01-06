import type { Metadata } from "next";
import "./globals.css";
import Navigation from "./components/Navigation";

export const metadata: Metadata = {
	title: "eskoubar - Nicklas Eskou",
	description: "Personligt brand website for eskoubar - Website development, web applications, automation og digital business optimering",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body suppressHydrationWarning className="min-h-screen flex flex-col">
				<Navigation />
				<main className="flex-1">
					{children}
				</main>
			</body>
		</html>
	);
}
