import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";

const fontMain = Plus_Jakarta_Sans({
	subsets: ["latin"],
	variable: "--font-main",
	display: "swap",
});

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
			<body suppressHydrationWarning className={`${fontMain.variable} font-sans min-h-screen flex flex-col bg-brand-neutral-950 text-white`}>
				<Navigation />
				<main className="flex-1 pt-32">
					{children}
				</main>
			</body>
		</html>
	);
}
