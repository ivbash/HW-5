import { UseContextExample } from '@/tasks/1.1-use-context';
import { UseCallbackExample } from '@/tasks/1.2-use-callback';
import { UseMemoExample } from '@/tasks/1.3-use-memo';
import { UseRefExample } from '@/tasks/1.4-use-ref';

export function App() {
  return (
    <div className="mx-auto max-w-lg space-y-4 py-4">
      <UseContextExample />
      <UseCallbackExample />
      <UseMemoExample />
      <UseRefExample />
    </div>
  );
}
