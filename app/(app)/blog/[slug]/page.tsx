import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import { buildJsonLd } from '@/lib/utils/schema'

type Props = {
	params: Promise<{
		slug: string
	}>
}

export default async function BlogPostPage({ params }: Props) {
	const { slug } = await params
	const payload = await getPayload({ config })
	const { isEnabled: draft } = await draftMode()

	try {
		// Fetch blog post
		const result = await payload.find({
			collection: 'blog' as any,
			where: {
				slug: {
					equals: slug,
				},
				...(draft
					? {}
					: {
							_status: {
								equals: 'published',
							},
					  }),
			},
			draft,
			limit: 1,
			depth: 2, // Populate relationships
		})

		const post = result.docs[0] as any

		if (!post) {
			console.log('Post not found for slug:', slug, 'draft mode:', draft)
			notFound()
		}

		// Fetch site settings for schema markup
		const siteSettings = await payload.findGlobal({
			slug: 'site-settings',
		})

		// Generate JSON-LD structured data
		const jsonLd = buildJsonLd(post, siteSettings as any)

		return (
			<>
				{/* JSON-LD Structured Data */}
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>

				<article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
				<header className="mb-8">
					{post.publishedDate && (
						<time className="text-brand-neutral-400 text-sm mb-4 block">
							{new Date(post.publishedDate).toLocaleDateString('da-DK', {
								year: 'numeric',
								month: 'long',
								day: 'numeric',
							})}
						</time>
					)}
					<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
						{post.title}
					</h1>
					{post.excerpt && (
						<p className="text-xl text-brand-neutral-300 mb-6">{post.excerpt}</p>
					)}
				</header>

				{post.featuredImage && typeof post.featuredImage === 'object' && (
					<div className="mb-8">
						<img
							src={post.featuredImage.url || ''}
							alt={post.featuredImage.alt || post.title}
							className="w-full rounded-2xl"
						/>
					</div>
				)}

				{post.content && (
					<div className="prose prose-invert max-w-none">
						{/* Rich text content will be rendered here */}
						{/* TODO: Implement lexical rich text renderer */}
						<div dangerouslySetInnerHTML={{ __html: String(post.content) }} />
					</div>
				)}
				</article>
			</>
		)
	} catch (error) {
		console.error('Error fetching blog post:', error)
		notFound()
	}
}

