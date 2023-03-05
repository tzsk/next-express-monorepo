import { z } from 'zod';

export const TodoModel = z.object({
  id: z.number(),
  title: z.string(),
  completed: z.boolean().default(false),
});
export type ITodo = z.infer<typeof TodoModel>;
