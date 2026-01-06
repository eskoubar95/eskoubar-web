import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
	slug: 'categories',
	admin: {
		useAsTitle: 'name',
	},
	access: {
		read: () => true,
	},
	fields: [
		{
			name: 'name',
			type: 'text',
			required: true,
			unique: true,
			admin: {
				description: 'Category name',
			},
		},
		{
			name: 'slug',
			type: 'text',
			required: true,
			unique: true,
			admin: {
				description: 'URL-friendly version of the category name',
			},
			hooks: {
				beforeValidate: [
					({ data, operation, value }) => {
						if (operation === 'create' && !value && data?.name) {
							return data.name
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
			name: 'description',
			type: 'textarea',
			admin: {
				description: 'Optional description of the category',
			},
		},
	],
}

