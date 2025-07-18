import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
	}),
});

const projects = defineCollection({
	type: 'content',
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