import { z } from "zod";

export const createBlogFormSchema = z.object({
  title: z.string().min(1).max(64),
  content: z.string().min(1),
  thumbnail: z.string().min(1),
  imagesList: z.array(z.string().min(1).max(2048)),
  categoryId: z.number().int(),
  authorId: z.string().min(0).max(128),
  headersHtmlIds: z.array(z.string().min(0).max(64)),
});
