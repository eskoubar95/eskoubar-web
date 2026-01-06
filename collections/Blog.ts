import type { CollectionConfig } from 'payload'

export const Blog: CollectionConfig = {
	slug: 'blog',
	admin: {
		useAsTitle: 'title',
		defaultColumns: ['title', '_status', 'author', 'publishedDate', 'updatedAt'],
		livePreview: {
			url: ({ data, req }) => {
				const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
				const secret = process.env.PAYLOAD_PREVIEW_SECRET || 'preview-secret'
				if (data?.slug) {
					return `${baseUrl}/api/preview?secret=${secret}&slug=${data.slug}&collection=blog`
				}
				return `${baseUrl}/blog`
			},
			breakpoints: [
				{
					label: 'Mobile',
					name: 'mobile',
					width: 375,
					height: 667,
				},
				{
					label: 'Tablet',
					name: 'tablet',
					width: 768,
					height: 1024,
				},
				{
					label: 'Desktop',
					name: 'desktop',
					width: 1280,
					height: 720,
				},
			],
		},
		preview: (doc, { req }) => {
			const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
			const secret = process.env.PAYLOAD_PREVIEW_SECRET || 'preview-secret'
			if (doc?.slug) {
				return `${baseUrl}/api/preview?secret=${secret}&slug=${doc.slug}&collection=blog`
			}
			return `${baseUrl}/blog`
		},
	},
	versions: {
		drafts: {
			autosave: {
				interval: 100, // Autosave every 100ms for live preview
			},
			schedulePublish: true, // Enable scheduled publishing
		},
		maxPerDoc: 50, // Keep last 50 versions
	},
	access: {
		read: ({ req: { user } }) => {
			// Public sees only published
			if (!user) {
				return {
					_status: {
						equals: 'published',
					},
				}
			}
			// Authenticated users see all (including drafts)
			return true
		},
	},
	fields: [
		{
			type: 'tabs',
			tabs: [
				{
			label: 'Content',
			fields: [
				{
					name: 'title',
					type: 'text',
					required: true,
					admin: {
						description: 'The main title of the blog post',
					},
				},
				{
					name: 'featuredImage',
					type: 'upload',
					relationTo: 'media',
					admin: {
						description: 'Main thumbnail image for the blog post',
					},
				},
				{
					name: 'excerpt',
					type: 'textarea',
					admin: {
						description: 'Short summary for previews and listings',
					},
				},
				{
					name: 'content',
					type: 'richText',
					required: true,
					admin: {
						description: 'Main content of the blog post',
					},
				},
			],
				},
				{
					label: 'Appearance',
					fields: [
						{
							name: 'slug',
							type: 'text',
							required: true,
							unique: true,
							admin: {
								description: 'URL-friendly version of the title (auto-generated if left empty)',
							},
							hooks: {
								beforeValidate: [
									({ data, operation, value }) => {
										if (operation === 'create' && !value && data?.title) {
											return data.title
												.toLowerCase()
												.replace(/[^a-z0-9]+/g, '-')
												.replace(/(^-|-$)/g, '')
										}
										return value
									},
								],
							},
						},
						{
							name: 'author',
							type: 'relationship',
							relationTo: 'users',
							admin: {
								description: 'Author of the blog post',
							},
						},
						{
							name: 'categories',
							type: 'relationship',
							relationTo: 'categories' as any,
							hasMany: true,
							admin: {
								description: 'Categories for organizing blog posts',
							},
						},
						{
							name: 'tags',
							type: 'text',
							hasMany: true,
							admin: {
								description: 'Tags for categorizing and filtering blog posts',
							},
						},
					],
				},
				{
					label: 'AI',
					fields: [
						{
							name: 'schemaType',
							type: 'select',
							defaultValue: 'BlogPosting',
							options: [
								{
									label: 'Article',
									value: 'Article',
								},
								{
									label: 'BlogPosting',
									value: 'BlogPosting',
								},
							],
							admin: {
								description: 'Base schema.org type for structured data',
							},
						},
						{
							name: 'schemaAddons',
							type: 'blocks',
							label: 'Schema Add-ons',
							admin: {
								description: 'Tilføj ekstra schema markup for bedre AI-læsning og søgning',
							},
							blocks: [
								{
									slug: 'faqSchema',
									labels: {
										singular: 'FAQ Schema',
										plural: 'FAQ Schemas',
									},
									fields: [
										{
											name: 'faqItems',
											type: 'array',
											label: 'FAQ Items',
											required: true,
											minRows: 1,
											admin: {
												description: 'Question and answer pairs for FAQPage schema',
											},
											fields: [
												{
													name: 'question',
													type: 'text',
													required: true,
													admin: {
														description: 'The question',
													},
												},
												{
													name: 'answer',
													type: 'richText',
													required: true,
													admin: {
														description: 'The answer (supports formatting)',
													},
												},
											],
										},
									],
								},
								{
									slug: 'howToSchema',
									labels: {
										singular: 'HowTo Schema',
										plural: 'HowTo Schemas',
									},
									fields: [
										{
											name: 'howToTitle',
											type: 'text',
											admin: {
												description: 'Optional title (falls back to post title if empty)',
											},
										},
										{
											name: 'description',
											type: 'textarea',
											admin: {
												description: 'Brief description of the how-to guide',
											},
										},
										{
											name: 'totalTime',
											type: 'group',
											fields: [
												{
													name: 'hours',
													type: 'number',
													admin: {
														description: 'Hours (optional)',
													},
												},
												{
													name: 'minutes',
													type: 'number',
													admin: {
														description: 'Minutes (required if hours not set)',
													},
												},
											],
										},
										{
											name: 'steps',
											type: 'array',
											label: 'Steps',
											required: true,
											minRows: 1,
											admin: {
												description: 'Step-by-step instructions',
											},
											fields: [
												{
													name: 'name',
													type: 'text',
													required: true,
													admin: {
														description: 'Step name/title',
													},
												},
												{
													name: 'text',
													type: 'richText',
													required: true,
													admin: {
														description: 'Step instructions',
													},
												},
												{
													name: 'image',
													type: 'upload',
													relationTo: 'media',
													admin: {
														description: 'Optional step image',
													},
												},
												{
													name: 'url',
													type: 'text',
													admin: {
														description: 'Optional URL for this step',
													},
												},
											],
										},
										{
											name: 'tools',
											type: 'array',
											label: 'Tools',
											admin: {
												description: 'Tools needed (optional)',
											},
											fields: [
												{
													name: 'name',
													type: 'text',
													required: true,
												},
											],
										},
										{
											name: 'supplies',
											type: 'array',
											label: 'Supplies',
											admin: {
												description: 'Supplies needed (optional)',
											},
											fields: [
												{
													name: 'name',
													type: 'text',
													required: true,
												},
											],
										},
									],
								},
								{
									slug: 'videoSchema',
									labels: {
										singular: 'Video Schema',
										plural: 'Video Schemas',
									},
									fields: [
										{
											name: 'videoUrl',
											type: 'text',
											required: true,
											admin: {
												description: 'URL to the video (YouTube, Vimeo, etc.)',
											},
										},
										{
											name: 'thumbnailUrl',
											type: 'upload',
											relationTo: 'media',
											admin: {
												description: 'Video thumbnail image',
											},
										},
										{
											name: 'duration',
											type: 'text',
											admin: {
												description: 'Duration in ISO 8601 format (e.g., PT1H30M)',
											},
										},
										{
											name: 'uploadDate',
											type: 'date',
											admin: {
												description: 'Date video was uploaded',
											},
										},
									],
								},
							],
						},
						{
							name: 'speakable',
							type: 'group',
							label: 'Speakable',
							admin: {
								description: 'Mark content as speakable for voice assistants',
							},
							fields: [
								{
									name: 'enabled',
									type: 'checkbox',
									admin: {
										description: 'Enable speakable markup',
									},
								},
								{
									name: 'cssSelectors',
									type: 'array',
									label: 'CSS Selectors',
									admin: {
										description: 'CSS selectors for speakable content (e.g., .post-summary, .faq)',
										condition: (data: any) => data.enabled === true,
									},
									fields: [
										{
											name: 'selector',
											type: 'text',
											required: true,
										},
									],
								},
							],
						},
						{
							name: 'definedTerms',
							type: 'array',
							label: 'Defined Terms',
							admin: {
								description: 'Glossary terms for better AI understanding',
							},
							fields: [
								{
									name: 'term',
									type: 'text',
									required: true,
									admin: {
										description: 'The term name',
									},
								},
								{
									name: 'description',
									type: 'richText',
									required: true,
									admin: {
										description: 'Definition of the term',
									},
								},
								{
									name: 'sameAs',
									type: 'text',
									admin: {
										description: 'URL to external definition (optional)',
									},
								},
							],
						},
					],
				},
				// SEO tab will be added automatically by SEO plugin
			],
		},
	],
}

