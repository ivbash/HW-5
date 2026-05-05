/* eslint-disable react-hooks/refs */
import { useMemo, useRef, useState } from 'react';

export function UseMemoExample() {
  const [someState, setSomeState] = useState(false);
  const [numbers, setNumbers] = useState(() => generateNumbers(10));
  const calcCount = useRef(0);

  const sum = useMemo(() => {
    calcCount.current++;
    console.log('--- 1.3. useMemo');
    console.log(`Calculation count: ${calcCount.current}`);

    return numbers.reduce((sum, num) => sum + num, 0);
  }, [numbers]);

  return (
    <div className="space-y-2">
      <h2 className="mb-4 text-xl font-medium">
        1.3. useMemo — Оптимизация вычислений
      </h2>
      <p>Количество вычислений: {calcCount.current}</p>
      <p className="flex gap-1">
        {numbers.map((num, i) => (
          <span key={i} className="border px-1">
            {num}
          </span>
        ))}
        <span>= {sum}</span>
      </p>
      <div className="flex items-center gap-2">
        <button
          className="rounded-md bg-gray-800 px-2 py-1 text-gray-300 hover:opacity-80"
          onClick={() => setNumbers(generateNumbers(10))}
        >
          Генерировать
        </button>
        <button
          className="rounded-md bg-gray-300 px-2 py-1 text-gray-800 hover:opacity-80"
          onClick={() => setSomeState((ss) => !ss)}
        >
          Изменить состояние: {someState ? '+' : '-'}
        </button>
      </div>
    </div>
  );
}

function generateNumbers(count: number) {
  return Array.from({ length: count }, () => Math.floor(Math.random() * 100));
}
