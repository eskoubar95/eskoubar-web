import { draftMode } from 'next/headers'
import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url)
	const secret = searchParams.get('secret')
	const slug = searchParams.get('slug')
	const collection = searchParams.get('collection')

	// Verify secret token
	const previewSecret = process.env.PAYLOAD_PREVIEW_SECRET || 'preview-secret'
	if (secret !== previewSecret) {
		return new Response(
			JSON.stringify({ error: 'Invalid token', received: secret ? 'provided' : 'missing' }),
			{
				status: 401,
				headers: { 'Content-Type': 'application/json' },
			}
		)
	}

	if (!slug || !collection) {
		return new Response('Missing slug or collection', { status: 400 })
	}

	const payload = await getPayload({ config })

	try {
		// Fetch the document (including drafts)
		const doc = await payload.find({
			collection: collection as any,
			where: {
				slug: {
					equals: slug,
				},
			},
			draft: true,
			limit: 1,
		})

		if (!doc.docs || doc.docs.length === 0) {
			return new Response(
				JSON.stringify({ error: 'Document not found', slug, collection }),
				{
					status: 404,
					headers: { 'Content-Type': 'application/json' },
				}
			)
		}

		// Enable draft mode
		const draft = await draftMode()
		draft.enable()

		// Return redirect response (don't use Next.js redirect() as it throws an error)
		const redirectUrl = collection === 'blog' ? `/blog/${slug}` : `/${collection}/${slug}`
		return new Response(null, {
			status: 307,
			headers: {
				Location: redirectUrl,
			},
		})
	} catch (error) {
		console.error('Preview error:', error)
		return new Response(
			JSON.stringify({ error: 'Error generating preview', message: String(error) }),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			}
		)
	}
}

