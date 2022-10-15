import { memo } from 'react';
import { useGetAllTodos } from '../api';
import { useEditTodo } from '../api/editTodo';
import StatusSelect from './StatusSelect';

const Todo = (props: { handleSelect: (id: number) => void }) => {
  const { todoList, fetching, error } = useGetAllTodos();
  const { editTodo } = useEditTodo();
  const handleSelect = async (id: number, status: number) => {
    if (isNaN(status)) {
      alert('ステータスを設定してください');
      return;
    }
    await editTodo(status, id);
  };

  if (fetching) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  return (
    <div className="todo-container">
      {todoList.map((todo, i) => (
        <div
          className="todo-item"
          onClick={() => props.handleSelect(todo.id)}
          key={i}
        >
          <p>User Name:{todo.user.name}</p>
          <p>Id: {todo.id}</p>
          <p>Title: {todo.title}</p>
          Status:
          <StatusSelect
            onSelect={handleSelect}
            id={todo.id}
            selected={todo.status}
          />
        </div>
      ))}
    </div>
  );
};

export default memo(Todo);
