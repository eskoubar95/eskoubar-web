import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
	slug: 'site-settings',
	label: 'Site Settings',
	admin: {
		description: 'Global site settings including organization/publisher information for schema markup',
	},
	access: {
		read: () => true,
		update: ({ req: { user } }) => Boolean(user), // Only authenticated users can update
	},
	fields: [
		{
			type: 'tabs',
			tabs: [
				{
					label: 'Organization',
					fields: [
						{
							name: 'siteName',
							type: 'text',
							required: true,
							defaultValue: 'eskoubar',
							admin: {
								description: 'Site name (used in schema.org Organization)',
							},
						},
						{
							name: 'siteUrl',
							type: 'text',
							required: true,
							defaultValue: 'https://eskoubar.com',
							admin: {
								description: 'Base URL of the site',
							},
						},
						{
							name: 'logo',
							type: 'upload',
							relationTo: 'media',
							admin: {
								description: 'Site logo (used in Organization schema)',
							},
						},
						{
							name: 'organization',
							type: 'group',
							label: 'Organization Details',
							fields: [
								{
									name: 'name',
									type: 'text',
									admin: {
										description: 'Organization name (defaults to site name)',
									},
								},
								{
									name: 'url',
									type: 'text',
									admin: {
										description: 'Organization URL',
									},
								},
								{
									name: 'sameAs',
									type: 'array',
									label: 'Social Media Profiles',
									admin: {
										description: 'Social media profile URLs (LinkedIn, Twitter, etc.)',
									},
									fields: [
										{
											name: 'url',
											type: 'text',
											required: true,
										},
									],
								},
							],
						},
					],
				},
				{
					label: 'Contact',
					fields: [
						{
							name: 'email',
							type: 'email',
							admin: {
								description: 'Contact email',
							},
						},
						{
							name: 'phone',
							type: 'text',
							admin: {
								description: 'Contact phone number',
							},
						},
					],
				},
			],
		},
	],
}

