import { postgresAdapter } from "@payloadcms/db-postgres";
import { 
	lexicalEditor,
	HeadingFeature,
	ParagraphFeature,
	BoldFeature,
	ItalicFeature,
	UnderlineFeature,
	StrikethroughFeature,
	InlineCodeFeature,
	LinkFeature,
	UnorderedListFeature,
	OrderedListFeature,
	BlockquoteFeature,
	HorizontalRuleFeature,
	AlignFeature,
} from "@payloadcms/richtext-lexical";
import { seoPlugin } from "@payloadcms/plugin-seo";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Blog } from "./collections/Blog";
import { Categories } from "./collections/Categories";
import { SiteSettings } from "./globals/SiteSettings";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Categories, Blog],
  globals: [SiteSettings],
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      HeadingFeature({
        enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      }),
      ParagraphFeature(),
      BoldFeature(),
      ItalicFeature(),
      UnderlineFeature(),
      StrikethroughFeature(),
      InlineCodeFeature(),
      LinkFeature({
        enabledCollections: ['media'],
      }),
      UnorderedListFeature(),
      OrderedListFeature(),
      BlockquoteFeature(),
      HorizontalRuleFeature(),
      AlignFeature(),
    ],
  }),
  plugins: [
    seoPlugin({
      collections: ['blog'],
      uploadsCollection: 'media',
      tabbedUI: true, // SEO plugin will create its own SEO tab
      generateTitle: ({ doc }) => doc?.meta?.title || doc?.title || 'Blog Post',
      generateDescription: ({ doc }) => doc?.meta?.description || doc?.excerpt || '',
      generateURL: ({ doc }) => {
        if (doc?.slug) {
          return `https://eskoubar.com/blog/${doc.slug}`;
        }
        return 'https://eskoubar.com/blog';
      },
    }),
  ],
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || "",
    },
  }),
  sharp,
});
