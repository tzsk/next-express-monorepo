import { Checkbox } from 'primereact/checkbox';
import type { ITodo } from 'models/dist/todo';
import { useState } from 'react';
import { trpc } from '@/utils/trpc';

type TodoItemProps = React.PropsWithChildren<{ todo: ITodo }>;

export default function TodoItem({ todo }: TodoItemProps) {
  const [checked, setChecked] = useState<boolean>(todo.completed);
  const completeTodo = trpc.toggleTodo.useMutation();
  const ctx = trpc.useContext();

  const toggle = async () => {
    const completed = !checked;
    setChecked(completed);
    await completeTodo.mutateAsync({ ...todo, completed });
    ctx.fetchAllTodo.invalidate();
  };

  return (
    <div className="col-12 flex align-items-center gap-3">
      <Checkbox
        inputId={todo.id.toString()}
        checked={checked}
        onChange={toggle}
      />
      <label htmlFor={todo.id.toString()} className="py-2 flex-1">
        <strong
          data-test-id="todo-item"
          style={todo.completed ? { textDecoration: 'line-through' } : {}}
        >
          {todo.title}
        </strong>
      </label>
    </div>
  );
}
