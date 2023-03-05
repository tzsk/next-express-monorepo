import { z } from 'zod';
import { t } from './trpc';
import { TodoModel, type ITodo } from 'models/dist/todo';
import { TRPCError } from '@trpc/server';

const todoList: ITodo[] = [];

export const appRouter = t.router({
  fetchAllTodo: t.procedure
    .input(TodoModel.pick({ completed: true }).optional())
    .query((req) => {
      return req.input?.completed
        ? todoList.filter((item) => item.completed).reverse()
        : [...todoList].reverse();
    }),
  getTodoById: t.procedure.input(TodoModel.pick({ id: true })).query((req) => {
    const todo = todoList.find((item) => item.id === req.input.id);
    if (!todo) {
      throw new TRPCError({ code: 'NOT_FOUND' });
    }

    return todo;
  }),
  createTodo: t.procedure
    .input(TodoModel.omit({ id: true }))
    .mutation(async (req) => {
      const todo: ITodo = {
        id: Date.now(),
        title: req.input.title,
        completed: req.input.completed,
      };

      todoList.push(todo);

      return todo;
    }),
  toggleTodo: t.procedure
    .input(TodoModel.omit({ title: true }).extend({ completed: z.boolean() }))
    .mutation((req) => {
      const index = todoList.findIndex((item) => item.id === req.input.id);
      if (index < 0) {
        throw new TRPCError({ code: 'NOT_FOUND' });
      }
      const item = todoList[index];
      item.completed = req.input.completed;

      todoList.splice(index, 1, item);
      return item;
    }),
});
