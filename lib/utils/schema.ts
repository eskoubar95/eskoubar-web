/**
 * Utility functions for generating JSON-LD structured data
 * Converts Payload CMS blog post data to Schema.org JSON-LD format
 */

type BlogPost = {
	title: string
	slug: string
	excerpt?: string
	featuredImage?: {
		url?: string
		alt?: string
	} | string
	publishedDate?: string | Date
	updatedAt?: string | Date
	schemaType?: 'Article' | 'BlogPosting'
	author?: {
		name?: string
		email?: string
	} | string
	schemaAddons?: Array<{
		blockType: 'faqSchema' | 'howToSchema' | 'videoSchema'
		[key: string]: any
	}>
	speakable?: {
		enabled?: boolean
		cssSelectors?: Array<{ selector: string }>
	}
	definedTerms?: Array<{
		term: string
		description: any // Lexical rich text
		sameAs?: string
	}>
}

type SiteSettings = {
	siteName?: string
	siteUrl?: string
	logo?: {
		url?: string
	} | string
	organization?: {
		name?: string
		url?: string
		sameAs?: Array<{ url: string }>
	}
}

/**
 * Convert Lexical rich text to plain text
 * This is a simple implementation - for production, consider using @payloadcms/richtext-lexical's serializer
 */
function lexicalToPlainText(lexical: any): string {
	if (!lexical) return ''
	if (typeof lexical === 'string') return lexical

	// Simple extraction - just get text from nodes
	try {
		const root = lexical.root || lexical
		if (root.children) {
			return root.children
				.map((node: any) => {
					if (node.text) return node.text
					if (node.children) {
						return node.children.map((child: any) => child.text || '').join('')
					}
					return ''
				})
				.join(' ')
				.trim()
		}
	} catch (e) {
		// Fallback to string representation
		return String(lexical)
	}

	return String(lexical)
}

/**
 * Get image URL from media object or string
 */
function getImageUrl(image: any): string | undefined {
	if (!image) return undefined
	if (typeof image === 'string') return image
	if (image.url) return image.url
	return undefined
}

/**
 * Build JSON-LD structured data from blog post and site settings
 * Returns a @graph array that can be used in <script type="application/ld+json">
 */
export function buildJsonLd(post: BlogPost, siteSettings: SiteSettings) {
	const graph: any[] = []

	const siteUrl = siteSettings.siteUrl || 'https://eskoubar.com'
	const siteName = siteSettings.siteName || 'eskoubar'
	const postUrl = `${siteUrl}/blog/${post.slug}`

	// 1. Base BlogPosting/Article (always present)
	const baseSchema: any = {
		'@type': post.schemaType || 'BlogPosting',
		'@id': `${postUrl}#post`,
		headline: post.title,
		description: post.excerpt || '',
		image: getImageUrl(post.featuredImage),
		datePublished: post.publishedDate
			? new Date(post.publishedDate).toISOString()
			: undefined,
		dateModified: post.updatedAt
			? new Date(post.updatedAt).toISOString()
			: new Date().toISOString(),
		mainEntityOfPage: {
			'@type': 'WebPage',
			'@id': postUrl,
		},
	}

	// Add author if available
	if (post.author) {
		const authorName =
			typeof post.author === 'object'
				? post.author.name || post.author.email || 'Unknown'
				: post.author
		baseSchema.author = {
			'@type': 'Person',
			name: authorName,
		}
	}

	// Add publisher (Organization)
	const orgName = siteSettings.organization?.name || siteName
	const orgUrl = siteSettings.organization?.url || siteUrl
	const logoUrl = getImageUrl(siteSettings.logo)

	baseSchema.publisher = {
		'@type': 'Organization',
		name: orgName,
		url: orgUrl,
		...(logoUrl && { logo: logoUrl }),
		...(siteSettings.organization?.sameAs && {
			sameAs: siteSettings.organization.sameAs.map((item) => item.url),
		}),
	}

	graph.push(baseSchema)

	// 2. Process schema add-ons (blocks)
	if (post.schemaAddons && Array.isArray(post.schemaAddons)) {
		post.schemaAddons.forEach((block) => {
			switch (block.blockType) {
				case 'faqSchema':
					if (block.faqItems && Array.isArray(block.faqItems) && block.faqItems.length > 0) {
						graph.push({
							'@type': 'FAQPage',
							mainEntity: {
								'@type': 'ItemList',
								itemListElement: block.faqItems.map((faq: any, index: number) => ({
									'@type': 'Question',
									position: index + 1,
									name: faq.question,
									acceptedAnswer: {
										'@type': 'Answer',
										text: lexicalToPlainText(faq.answer),
									},
								})),
							},
						})
					}
					break

				case 'howToSchema':
					if (block.steps && Array.isArray(block.steps) && block.steps.length > 0) {
						const howTo: any = {
							'@type': 'HowTo',
							name: block.howToTitle || post.title,
							description: block.description || '',
							step: block.steps.map((step: any, index: number) => ({
								'@type': 'HowToStep',
								position: index + 1,
								name: step.name,
								text: lexicalToPlainText(step.text),
								...(step.image && { image: getImageUrl(step.image) }),
								...(step.url && { url: step.url }),
							})),
						}

						// Add total time if provided
						if (block.totalTime) {
							const hours = block.totalTime.hours || 0
							const minutes = block.totalTime.minutes || 0
							if (hours > 0 || minutes > 0) {
								howTo.totalTime = `PT${hours}H${minutes}M`
							}
						}

						// Add tools if provided
						if (block.tools && Array.isArray(block.tools) && block.tools.length > 0) {
							howTo.tool = block.tools.map((tool: any) => ({
								'@type': 'HowToTool',
								name: tool.name,
							}))
						}

						// Add supplies if provided
						if (
							block.supplies &&
							Array.isArray(block.supplies) &&
							block.supplies.length > 0
						) {
							howTo.supply = block.supplies.map((supply: any) => ({
								'@type': 'HowToSupply',
								name: supply.name,
							}))
						}

						graph.push(howTo)
					}
					break

				case 'videoSchema':
					if (block.videoUrl) {
						const video: any = {
							'@type': 'VideoObject',
							name: post.title,
							description: post.excerpt || '',
							contentUrl: block.videoUrl,
							...(block.thumbnailUrl && { thumbnailUrl: getImageUrl(block.thumbnailUrl) }),
							...(block.duration && { duration: block.duration }),
							...(block.uploadDate && {
								uploadDate: new Date(block.uploadDate).toISOString(),
							}),
						}
						graph.push(video)
					}
					break
			}
		})
	}

	// 3. Speakable (if enabled)
	if (post.speakable?.enabled && post.speakable.cssSelectors?.length > 0) {
		graph.push({
			'@type': 'SpeakableSpecification',
			cssSelector: post.speakable.cssSelectors.map((s) => s.selector),
		})
	}

	// 4. Defined Terms
	if (post.definedTerms && Array.isArray(post.definedTerms) && post.definedTerms.length > 0) {
		post.definedTerms.forEach((term) => {
			graph.push({
				'@type': 'DefinedTerm',
				name: term.term,
				description: lexicalToPlainText(term.description),
				...(term.sameAs && { sameAs: term.sameAs }),
			})
		})
	}

	// Return as @graph structure
	return {
		'@context': 'https://schema.org',
		'@graph': graph,
	}
}

/**
 * Render JSON-LD script tag
 */
export function renderJsonLdScript(jsonLd: any): string {
	return `<script type="application/ld+json">${JSON.stringify(jsonLd, null, 2)}</script>`
}

