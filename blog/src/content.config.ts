import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: image().optional(),
	}),
});

const projects = defineCollection({
	// Load Markdown and MDX files in the `src/content/projects/` directory.
	loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		category: z.string().optional(),
		technologies: z.array(z.string()).optional(),
		link: z.string().url().optional(),
		github: z.string().url().optional(),
		image: z.string().optional(),
		featured: z.boolean().default(false),
		status: z.enum(['completed', 'in-progress', 'planned']).default('in-progress'),
		startDate: z.coerce.date(),
		endDate: z.coerce.date().optional(),
	}),
});

export const collections = { blog, projects };
