import { defineCollection, z } from 'astro:content';

const artwork = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    about: z.string().optional().default(''),
    artistNotes: z.string().optional().default(''),
    price: z.string().optional().default(''),
    info: z.string().optional().default(''),
    date: z.union([z.string(), z.date()]).optional().transform(v => v ? String(v) : ''),
    tags: z.array(z.string()).optional().default([]),
    type: z.array(z.string()).optional().default([]),
    featuredImage: z.string().optional().default(''),
    original: z.boolean().optional().default(true),
    storeHighlight: z.boolean().optional().default(false),
    is_store_item: z.boolean().optional().default(true),
    is_archive_item: z.boolean().optional().default(false),
    archive_topic: z.array(z.string()).optional().default([]),
  }),
});

export const collections = { artwork };
