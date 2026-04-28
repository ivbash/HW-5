import { UseContextExample } from '@/tasks/1.1-use-context';
import { UseCallbackExample } from '@/tasks/1.2-use-callback';
import { UseMemoExample } from '@/tasks/1.3-use-memo';
import { UseRefExample } from '@/tasks/1.4-use-ref';
import { UseReducerExample } from '@/tasks/1.5-use-reducer';
import { ReactMemoExample } from '@/tasks/1.6-react-memo';
import { CombinedHooksExample } from '@/tasks/1.7-combined-hooks';

export function App() {
  return (
    <div className="mx-auto max-w-lg space-y-8 px-2 py-6">
      <UseContextExample />
      <UseCallbackExample />
      <UseMemoExample />
      <UseRefExample />
      <UseReducerExample />
      <ReactMemoExample />
      <CombinedHooksExample />
    </div>
  );
}
