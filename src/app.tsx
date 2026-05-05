import { UseContextExample } from '@/tasks/1.1-use-context';
import { UseCallbackExample } from '@/tasks/1.2-use-callback';
import { UseMemoExample } from '@/tasks/1.3-use-memo';
import { UseRefExample } from '@/tasks/1.4-use-ref';
import { UseReducerExample } from '@/tasks/1.5-use-reducer';
import { ReactMemoExample } from '@/tasks/1.6-react-memo';
import { CombinedHooksExample } from '@/tasks/1.7-combined-hooks';
import { BadFormExample } from '@/tasks/2.1-bad-form';
import { RHFZodFormExample } from '@/tasks/2.2-rhf-zod';
import { FormikYupFormExample } from '@/tasks/2.3-formik-yup';

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
      <BadFormExample />
      <RHFZodFormExample />
      <FormikYupFormExample />
    </div>
  );
}
