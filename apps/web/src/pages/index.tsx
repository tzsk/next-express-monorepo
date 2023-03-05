import { trpc } from '@/utils/trpc';
import Head from 'next/head';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { type FormEvent, useState } from 'react';
import TodoList from '@/components/todo-list';

export default function Home() {
  const [title, setTitle] = useState<string>('');
  const context = trpc.useContext();
  const createTodo = trpc.createTodo.useMutation();
  // trpc.fetchAllTodo.useQuery();

  const mutate = async (e: FormEvent) => {
    e.preventDefault();
    if (!title) {
      alert('Please enter some task');
      return;
    }

    await createTodo.mutateAsync({ title });
    setTitle('');
    context.fetchAllTodo.invalidate();
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className="w-4 mx-auto flex flex-column gap-4">
        <h2 className="text-center">Todo App</h2>
        <form onSubmit={(e) => mutate(e)}>
          <InputText
            value={title}
            style={{ width: '100%' }}
            placeholder="What are you doing next?"
            onChange={(e) => setTitle(e.target.value)}
          />
        </form>

        <Card>
          <TodoList />
        </Card>
      </main>
    </>
  );
}
