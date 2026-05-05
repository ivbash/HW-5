/* eslint-disable react-hooks/refs */
import { memo, useCallback, useRef, useState } from 'react';

function Child({
  title,
  text,
  logTitle,
  onClick,
}: {
  title: string;
  text: string;
  logTitle: string;
  onClick?: () => void;
}) {
  console.log(`${logTitle}: render`);

  const renderCount = useRef(0);
  renderCount.current++;

  return (
    <div className="border p-1">
      <h3 className="font-medium">{title}</h3>
      <p className="flex items-center gap-2">
        <span>{text}</span>
        {!!onClick && (
          <button
            className="rounded-md bg-gray-800 px-2 pt-0.5 pb-1 font-medium text-gray-300 hover:opacity-80"
            onClick={onClick}
          >
            ++
          </button>
        )}
      </p>
      <p>Количество отрисовок: {renderCount.current}</p>
    </div>
  );
}

const MemoChild = memo(Child);

export function ReactMemoExample() {
  console.log('--- 1.6. React.memo');

  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  const increment1 = () => setCount1((c) => c + 1);
  const increment2 = () => setCount2((c) => c + 1);

  const incrementWithUseCallback2 = useCallback(
    () => setCount2((c) => c + 1),
    [],
  );

  return (
    <div className="space-y-2">
      <h2 className="mb-4 text-xl font-medium">
        1.6. React.memo — Оптимизация рендеринга
      </h2>
      <p className="flex items-center gap-2">
        <span>Счетчик 1: {count1}</span>
        <button
          className="rounded-md bg-gray-800 px-2 pt-0.5 pb-1 font-medium text-gray-300 hover:opacity-80"
          onClick={increment1}
        >
          ++
        </button>
      </p>
      <p className="flex items-center gap-2">
        <span>Счетчик 2: {count2}</span>
        <button
          className="rounded-md bg-gray-800 px-2 pt-0.5 pb-1 font-medium text-gray-300 hover:opacity-80"
          onClick={increment2}
        >
          ++
        </button>
      </p>
      <Child
        title="Дочерний компонент"
        text={`Значение счетчика 1: ${count1}`}
        logTitle="Child"
      />
      <MemoChild
        title="Дочерний компонент с memo"
        text={`Значение счетчика 2: ${count2}`}
        logTitle="Memoized Child"
      />
      <MemoChild
        title="Дочерний компонент с memo и переданной функцией"
        text={`Счетчик 2: ${count2}`}
        logTitle="Memoized Child (no useCallback)"
        onClick={increment2}
      />
      <MemoChild
        title="Дочерний компонент с memo и переданным useCallback"
        text={`Счетчик 2: ${count2}`}
        logTitle="Memoized Child (useCallback)"
        onClick={incrementWithUseCallback2}
      />
      <p>
        <span className="font-medium">Дочерний компонент</span> не обернут в
        React.memo, поэтому рендерится при изменении обоих счетчиков.
      </p>
      <p>
        <span className="font-medium">Дочерний компонент с memo</span>{' '}
        рендерится только при изменении счетчика 2.
      </p>
      <p>
        <span className="font-medium">
          Дочерний компонент с memo и переданной функцией
        </span>{' '}
        без useCallback, хотя обернут в React.memo, рендерится при изменении
        обоих счетчиков, так как функция пересоздается при каждом рендере
        родителя.
      </p>
      <p>
        <span className="font-medium">
          Дочерний компонент с memo и переданным useCallback
        </span>{' '}
        рендерится только при изменении счетчика 2.
      </p>
    </div>
  );
}
