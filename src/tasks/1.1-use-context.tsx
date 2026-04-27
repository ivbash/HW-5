import { cn } from '@/utils';
import { createContext, useCallback, useContext, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

function isTheme(value: unknown): value is Theme {
  return value === 'light' || value === 'dark';
}

function loadTheme() {
  const theme = localStorage.getItem('theme');
  return isTheme(theme) ? theme : 'light';
}

function saveTheme(theme: Theme) {
  localStorage.setItem('theme', theme);
}

const ThemeContext = createContext<ThemeContextType | null>(null);

function ThemeProvider({ children }: { children?: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(loadTheme);

  const toggleTheme = useCallback(() => {
    setTheme((t) => {
      if (t === 'light') {
        saveTheme('dark');
        return 'dark';
      } else {
        saveTheme('light');
        return 'light';
      }
    });
  }, []);

  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>;
}

function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      'Make sure to use `ThemeProvider` before using theme context.',
    );
  }

  return context;
}

export function UseContextExample() {
  return (
    <ThemeProvider>
      <div>
        <h2 className="mb-4 text-xl font-medium">
          1.1. useContext — Тёмная/светлая тема
        </h2>
        <ThemedHeader />
        <ThemedContent />
      </div>
    </ThemeProvider>
  );
}

function ThemedHeader() {
  const { theme } = useTheme();

  return (
    <div
      className={cn(
        'flex items-center justify-between p-4',
        {
          light: 'bg-gray-300 text-gray-800',
          dark: 'bg-gray-800 text-gray-300',
        }[theme],
      )}
    >
      <div className="font-medium">App</div>
      <div>
        <ToggleThemeButton />
      </div>
    </div>
  );
}

function ToggleThemeButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={cn(
        'rounded-md px-2 py-1 font-medium hover:opacity-80',
        {
          light: 'bg-gray-800 text-gray-300',
          dark: 'bg-gray-300 text-gray-800',
        }[theme],
      )}
      onClick={toggleTheme}
    >
      {theme === 'light' ? 'Светлая' : 'Темная'}
    </button>
  );
}

function ThemedContent() {
  const { theme } = useTheme();

  return (
    <div
      className={cn(
        'p-4',
        {
          light: 'bg-gray-50 text-gray-950',
          dark: 'bg-gray-950 text-gray-50',
        }[theme],
      )}
    >
      <h3 className="text-lg font-medium">Заголовок</h3>
      <p>Какой-то текст</p>
    </div>
  );
}
