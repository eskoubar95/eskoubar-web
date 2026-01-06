import type { Metadata } from "next";
import "./globals.css";

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
		<html lang="da">
			<body>{children}</body>
		</html>
	);
}
