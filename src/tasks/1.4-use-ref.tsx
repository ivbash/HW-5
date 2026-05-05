import { useRef, useState } from 'react';

export function UseRefExample() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');
  const prevInputValue = useRef('');

  return (
    <div className="space-y-2">
      <h2 className="mb-4 text-xl font-medium">
        1.4. useRef — Фокус и предыдущее значение
      </h2>
      <p className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          className="rounded-md border border-gray-800 px-2 py-1"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            prevInputValue.current = inputValue;
          }}
        />
        <button
          className="rounded-md border border-gray-800 bg-gray-800 px-2 py-1 text-gray-300 hover:opacity-80"
          onClick={() => inputRef.current?.focus()}
        >
          Фокус
        </button>
      </p>
      {/* eslint-disable-next-line react-hooks/refs */}
      <p>Предыдущее значение: {prevInputValue.current}</p>
    </div>
  );
}
