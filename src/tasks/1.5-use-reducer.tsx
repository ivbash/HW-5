import { uuid } from '@/utils';
import { useReducer, useState } from 'react';

type TodoId = string;

interface Todo {
  id: TodoId;
  text: string;
  checked: boolean;
}

interface TodoState {
  todos: Todo[];
}

type TodoAction =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: TodoId }
  | { type: 'DELETE_TODO'; payload: TodoId };

const initialState: TodoState = {
  todos: [
    { id: uuid(), text: 'Задача 1', checked: false },
    { id: uuid(), text: 'Задача 2', checked: true },
    { id: uuid(), text: 'Задача 3', checked: false },
  ],
};

function todoReducer(state: TodoState, action: TodoAction): TodoState {
  const { type, payload } = action;

  switch (type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, { id: uuid(), text: payload, checked: false }],
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === payload ? { ...t, checked: !t.checked } : t,
        ),
      };

    case 'DELETE_TODO':
      return { ...state, todos: state.todos.filter((t) => t.id !== payload) };

    default:
      return state;
  }
}

function TodoList() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [todoText, setTodoText] = useState('');

  return (
    <div className="space-y-2">
      <form
        className="flex items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ type: 'ADD_TODO', payload: todoText });
          setTodoText('');
        }}
      >
        <input
          type="text"
          className="grow rounded-md border border-gray-800 px-2 py-1"
          placeholder="Текст задачи"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
        />
        <button
          type="submit"
          className="rounded-md border border-gray-800 bg-gray-800 px-2 py-1 text-gray-300 hover:opacity-80"
        >
          Добавить
        </button>
      </form>
      <ul className="space-y-2">
        {state.todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center gap-2 rounded-md border border-gray-800 px-2 py-2"
          >
            <input
              type="checkbox"
              className="size-4"
              checked={todo.checked}
              onChange={() =>
                dispatch({ type: 'TOGGLE_TODO', payload: todo.id })
              }
            />
            <span>{todo.text}</span>
            <button
              type="button"
              className="relative ml-auto size-6 rounded-md bg-red-500 text-gray-300 hover:opacity-80"
              onClick={() =>
                dispatch({ type: 'DELETE_TODO', payload: todo.id })
              }
            >
              <span className="absolute top-1/2 left-1/2 block h-0.5 w-3 -translate-1/2 rotate-45 bg-gray-300" />
              <span className="absolute top-1/2 left-1/2 block h-0.5 w-3 -translate-1/2 -rotate-45 bg-gray-300" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function UseReducerExample() {
  return (
    <div className="space-y-2">
      <h2 className="mb-4 text-xl font-medium">1.5. useReducer — Todo List</h2>
      <TodoList />
    </div>
  );
}
