import { z } from "zod";

export const createBlogFormSchema = z.object({
  title: z.string().min(1).max(64),
  content: z.string().min(1),
  thumbnail: z.string().min(1),
  categoryId: z.number().int(),
  authorId: z.string().min(0).max(128),
  timeToRead: z.string().min(1).max(64),
  isPublished: z.boolean().default(false),
});
