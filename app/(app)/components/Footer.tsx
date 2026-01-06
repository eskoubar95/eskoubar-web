import Link from 'next/link';

export default function Footer() {
	const currentYear = new Date().getFullYear();

	const footerLinks = {
		legal: [
			{ href: '/privacy', label: 'Privacy Policy' },
			{ href: '/terms', label: 'Terms of Service' },
		],
		social: [
			{ href: 'https://github.com/eskoubar95', label: 'GitHub', icon: 'github' },
			{ href: 'https://linkedin.com/in/nicklas-eskou', label: 'LinkedIn', icon: 'linkedin' },
			{ href: 'https://twitter.com/eskoubar', label: 'Twitter', icon: 'twitter' },
		],
	};

	return (
		<footer className="mt-auto py-12 px-4">
			<div className="max-w-7xl mx-auto">
				<div className="glass-panel rounded-2xl p-8 md:p-12">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
						{/* Brand Section */}
						<div className="space-y-4">
							<Link href="/" className="brand-logo text-2xl block">
								eskoubar
							</Link>
							<p className="text-brand-neutral-400 text-sm leading-relaxed">
								Website development, web applications, automation and digital business optimization.
							</p>
						</div>

						{/* Legal Links */}
						<div className="space-y-4">
							<h3 className="text-sm font-semibold text-white uppercase tracking-wide">
								Legal
							</h3>
							<ul className="space-y-3">
								{footerLinks.legal.map((link) => (
									<li key={link.href}>
										<Link
											href={link.href}
											className="text-brand-neutral-400 hover:text-white text-sm transition-colors no-underline"
										>
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>

						{/* Social Links */}
						<div className="space-y-4">
							<h3 className="text-sm font-semibold text-white uppercase tracking-wide">
								Connect
							</h3>
							<ul className="space-y-3">
								{footerLinks.social.map((link) => (
									<li key={link.href}>
										<a
											href={link.href}
											target="_blank"
											rel="noopener noreferrer"
											className="text-brand-neutral-400 hover:text-white text-sm transition-colors no-underline"
										>
											{link.label}
										</a>
									</li>
								))}
							</ul>
						</div>
					</div>

					{/* Copyright */}
					<div className="mt-8 pt-8 border-t border-white/10">
						<p className="text-brand-neutral-500 text-xs text-center">
							© {currentYear} eskoubar. All rights reserved.
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}

