import { cn, uuid } from '@/utils';
import {
  createContext,
  memo,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  useState,
} from 'react';

type TaskId = string;

type Priority = 'low' | 'medium' | 'high';

interface Task {
  id: TaskId;
  text: string;
  priority: Priority;
  checked: boolean;
}

interface TaskState {
  tasks: Task[];
}

type TaskAction =
  | { type: 'ADD_TASK'; payload: { text: string; priority: Priority } }
  | { type: 'TOGGLE_TASK'; payload: TaskId }
  | { type: 'DELETE_TASK'; payload: TaskId };

interface Filters {
  search: string;
  hideChecked: boolean;
  hidePriority: boolean;
}

interface PriorityFilterContextType {
  hidePriority: boolean;
}

const PriorityFilterContext = createContext<PriorityFilterContextType>({
  hidePriority: false,
});

function usePriorityFilter() {
  return useContext(PriorityFilterContext);
}

const priorityMap: Record<Priority, string> = {
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий',
};

const initialState: TaskState = {
  tasks: [
    {
      id: uuid(),
      text: 'Сделать домашнее задание',
      priority: 'high',
      checked: false,
    },
    { id: uuid(), text: 'Просмотреть лекцию', priority: 'low', checked: true },
    {
      id: uuid(),
      text: 'Просмотреть презентацию',
      priority: 'medium',
      checked: false,
    },
  ],
};

function taskReducer(state: TaskState, action: TaskAction): TaskState {
  const { type, payload } = action;

  switch (type) {
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, { ...payload, id: uuid(), checked: false }],
      };
    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === payload ? { ...t, checked: !t.checked } : t,
        ),
      };
    case 'DELETE_TASK':
      return { ...state, tasks: state.tasks.filter((t) => t.id !== payload) };
    default:
      return state;
  }
}

function Tasks() {
  const [state, dispatch] = useReducer(taskReducer, initialState);
  const [filters, setFilters] = useState<Filters>({
    search: '',
    hideChecked: false,
    hidePriority: false,
  });

  const handleAddTask = useCallback(
    (text: string, priority: Priority) =>
      dispatch({ type: 'ADD_TASK', payload: { text, priority } }),
    [],
  );

  const handleFilter = useCallback(
    (filters: Filters) => setFilters(filters),
    [],
  );

  const handleToggleTask = useCallback(
    (id: TaskId) => dispatch({ type: 'TOGGLE_TASK', payload: id }),
    [],
  );

  const handleDeleteTask = useCallback(
    (id: TaskId) => dispatch({ type: 'DELETE_TASK', payload: id }),
    [],
  );

  const filteredTasks = useMemo(() => {
    console.log('--- 1.7.');
    console.log('Filter tasks (useMemo)');

    return state.tasks.filter(
      (task) =>
        (task.text.toLowerCase().includes(filters.search) ||
          priorityMap[task.priority].toLowerCase().includes(filters.search)) &&
        (!filters.hideChecked || !task.checked),
    );
  }, [filters.hideChecked, filters.search, state.tasks]);

  const priorityFilter = useMemo(() => {
    console.log('--- 1.7.');
    console.log('Priority filter context value (useMemo)');

    return { hidePriority: filters.hidePriority };
  }, [filters.hidePriority]);

  return (
    <PriorityFilterContext value={priorityFilter}>
      <div className="space-y-4">
        <AddTaskForm onAdd={handleAddTask} />
        <TaskFilters onFilter={handleFilter} />
        <ul className="space-y-2">
          {filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={handleToggleTask}
              onDelete={handleDeleteTask}
            />
          ))}
        </ul>
      </div>
    </PriorityFilterContext>
  );
}

const AddTaskForm = memo(function AddTaskForm({
  onAdd,
}: {
  onAdd: (text: string, priority: Priority) => void;
}) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority | ''>('');
  const [error, setError] = useState('');

  return (
    <form
      className="space-y-1"
      onSubmit={(e) => {
        e.preventDefault();

        if (!priority) {
          setError('Выберите приоритет');
          return;
        }

        onAdd(text, priority);
        setText('');
      }}
    >
      <div className="flex items-center gap-2">
        <input
          type="text"
          className="min-w-0 grow rounded-md border border-gray-800 px-2 py-1"
          placeholder="Текст задачи"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <select
          className="rounded-md border border-gray-800 px-2 py-1"
          value={priority}
          onChange={(e) => {
            setPriority(e.target.value as Priority);
            setError('');
          }}
        >
          <option value="" disabled>
            Приоритет
          </option>
          <option value="low">Низкий</option>
          <option value="medium">Средний</option>
          <option value="high">Высокий</option>
        </select>
        <button
          type="submit"
          className="rounded-md border border-gray-800 bg-gray-800 px-2 py-1 text-gray-300 hover:opacity-80"
        >
          Добавить
        </button>
      </div>
      {!!error && <p className="text-red-500">{error}</p>}
    </form>
  );
});

const TaskFilters = memo(function TaskFilters({
  onFilter,
}: {
  onFilter: (filters: Filters) => void;
}) {
  const [search, setSearch] = useState('');
  const [hideChecked, setHideChecked] = useState(false);
  const [hidePriority, setHidePriority] = useState(false);

  return (
    <div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          className="min-w-0 grow rounded-md border border-gray-800 px-2 py-1"
          placeholder="Поиск по задаче или приоритету"
          value={search}
          onChange={(e) => {
            const search = e.target.value;
            setSearch(search);
            onFilter({
              search: search.toLowerCase(),
              hideChecked,
              hidePriority,
            });
          }}
        />
        <label className="flex items-center gap-2">
          Скрыть выполненные
          <input
            type="checkbox"
            className="size-4"
            checked={hideChecked}
            onChange={(e) => {
              const hideChecked = e.target.checked;
              setHideChecked(hideChecked);
              onFilter({ search, hideChecked, hidePriority });
            }}
          />
        </label>
      </div>
      <div className="flex justify-end">
        <label className="flex items-center gap-2">
          Скрыть приоритет
          <input
            type="checkbox"
            className="size-4"
            checked={hidePriority}
            onChange={(e) => {
              const hidePriority = e.target.checked;
              setHidePriority(hidePriority);
              onFilter({ search, hideChecked, hidePriority });
            }}
          />
        </label>
      </div>
    </div>
  );
});

const TaskItem = memo(function TaskItem({
  task,
  onToggle,
  onDelete,
}: {
  task: Task;
  onToggle: (id: TaskId) => void;
  onDelete: (id: TaskId) => void;
}) {
  const { hidePriority } = usePriorityFilter();

  return (
    <li className="flex items-center gap-2 rounded-md border border-gray-800 px-2 py-2">
      <input
        type="checkbox"
        className="size-4"
        checked={task.checked}
        onChange={() => onToggle(task.id)}
      />
      <span className="mr-auto">{task.text}</span>
      {!hidePriority && (
        <span
          className={cn(
            'rounded-md px-1',
            {
              low: 'bg-green-500/20',
              medium: 'bg-yellow-500/20',
              high: 'bg-red-500/20',
            }[task.priority],
          )}
        >
          {priorityMap[task.priority]}
        </span>
      )}
      <button
        type="button"
        className="relative size-6 rounded-md bg-red-500 text-gray-300 hover:opacity-80"
        onClick={() => onDelete(task.id)}
      >
        <span className="absolute top-1/2 left-1/2 block h-0.5 w-3 -translate-1/2 rotate-45 bg-gray-300" />
        <span className="absolute top-1/2 left-1/2 block h-0.5 w-3 -translate-1/2 -rotate-45 bg-gray-300" />
      </button>
    </li>
  );
});

export function CombinedHooksExample() {
  return (
    <div className="space-y-2">
      <h2 className="mb-4 text-xl font-medium">
        1.7. Бонус — Комбинирование хуков
      </h2>
      <Tasks />
    </div>
  );
}
