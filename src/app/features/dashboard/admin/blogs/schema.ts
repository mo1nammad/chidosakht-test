import { z } from "zod";

export const createBlogFormSchema = z.object({
  title: z.string().min(1).max(64),
});

export const editBlogFormSchema = z.object({
  title: z.string().min(1).max(64),
  content: z.string(),
  thumbnail: z.string(),
  categoryId: z.number().int().optional(),
  timeToRead: z.string().max(64),
  isPublished: z.boolean().default(false),
});
