/* eslint-disable react-hooks/refs */
import { memo, useCallback, useRef, useState } from 'react';

function Increment({
  title,
  logTitle,
  onClick,
}: {
  title: string;
  logTitle: string;
  onClick?: () => void;
}) {
  console.log(`${logTitle}: render`);

  const renderCount = useRef(0);
  renderCount.current++;

  return (
    <div className="border p-1">
      <p className="flex items-center justify-between gap-2">
        <span>{title}:</span>
        <button
          className="rounded-md bg-gray-800 px-2 pt-0.5 pb-1 font-medium text-gray-300 hover:opacity-80"
          onClick={onClick}
        >
          ++
        </button>
      </p>
      <p>Количество отрисовок: {renderCount.current}</p>
    </div>
  );
}

const MemoIncrement = memo(Increment);

export function UseCallbackExample() {
  console.log('--- 1.2 useCallback');

  const [count, setCount] = useState(0);

  const increment = () => setCount((c) => c + 1);
  const incrementWithUseCallback = useCallback(
    () => setCount((c) => c + 1),
    [],
  );

  return (
    <div className="space-y-2">
      <h2 className="mb-4 text-xl font-medium">
        1.2. useCallback — Оптимизация обработчиков
      </h2>
      <p>Значение счетчика: {count}</p>
      <Increment title="Счетчик" logTitle="Increment" onClick={increment} />
      <Increment
        title="Счетчик с переданным useCallback"
        logTitle="Increment (useCallback)"
        onClick={incrementWithUseCallback}
      />
      <MemoIncrement
        title="Счетчик с memo"
        logTitle="Memoized Increment"
        onClick={increment}
      />
      <MemoIncrement
        title="Счетчик с memo и переданным useCallback"
        logTitle="Memoized Increment (useCallback)"
        onClick={incrementWithUseCallback}
      />
    </div>
  );
}
