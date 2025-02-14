import { z } from "zod";

export const createBlogFormSchema = z.object({
  title: z.string().min(1).max(64),
});
