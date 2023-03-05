import { trpc } from '@/utils/trpc';
import { DataView } from 'primereact/dataview';
import { Skeleton } from 'primereact/skeleton';
import TodoItem from './todo-item';

export default function TodoList() {
  const { data, error, isLoading } = trpc.fetchAllTodo.useQuery();

  if (error) {
    return <div>Something went wrong</div>;
  }

  if (isLoading) {
    return (
      <div className="flex align-items-center gap">
        <Skeleton size="2rem" className="mr-2" />
        <Skeleton height="2rem" />
      </div>
    );
  }

  return (
    <DataView
      className="gap-2"
      value={data}
      itemTemplate={(item) => <TodoItem todo={item} />}
      paginator
      rows={5}
    />
  );
}
