'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	const navLinks = [
		{ href: '/', label: 'Home' },
		{ href: '/blog', label: 'Blog' },
		{ href: '/about', label: 'About' },
		{ href: '/services', label: 'Services' },
		{ href: '/contact', label: 'Contact' },
	];

	return (
		<nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
			<div className="glass-panel rounded-full px-6 py-3 flex items-center justify-between w-full max-w-5xl">
				{/* Logo/Brand */}
				<Link href="/" className="brand-logo text-lg mr-8">
					eskoubar
				</Link>

				{/* Desktop Navigation */}
				<div className="hidden md:flex md:space-x-8">
					{navLinks.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							className="text-brand-neutral-400 hover:text-white text-sm font-medium transition-colors no-underline"
						>
							{link.label}
						</Link>
					))}
				</div>

				{/* CTA Button (Desktop) */}
				<div className="hidden md:block ml-8">
					<Link
						href="/contact"
						className="glass-button px-5 py-2 rounded-full text-sm font-medium hover:bg-white hover:text-brand-neutral-950 border-white/20 no-underline"
					>
						Let's talk
					</Link>
				</div>

				{/* Mobile menu button */}
				<button
					onClick={toggleMobileMenu}
					className="md:hidden inline-flex items-center justify-center p-2 rounded-full text-brand-neutral-200 hover:text-white hover:bg-white/10 focus:outline-none"
					aria-expanded="false"
					aria-label="Toggle navigation menu"
				>
						{isMobileMenuOpen ? (
							<svg
								className="block h-6 w-6"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						) : (
							<svg
								className="block h-6 w-6"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M4 6h16M4 12h16M4 18h16"
								/>
							</svg>
						)}
					</button>
				</div>

			{/* Mobile Navigation Overlay */}
			{isMobileMenuOpen && (
				<div className="absolute top-full left-0 mt-2 w-full glass-panel rounded-2xl overflow-hidden md:hidden">
					<div className="px-4 py-4 space-y-2">
						{navLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								onClick={() => setIsMobileMenuOpen(false)}
								className="text-brand-neutral-200 hover:text-white hover:bg-white/10 block px-4 py-3 rounded-xl text-base font-medium transition-colors no-underline"
							>
								{link.label}
							</Link>
						))}
					</div>
				</div>
			)}
		</nav>
	);
}

