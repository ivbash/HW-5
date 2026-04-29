/* eslint-disable react-hooks/refs */
import { useRef, useState } from 'react';

type Role = 'student' | 'teacher';

const notEmpty = createValidator((value: string) => {
  return !!value.trim();
});

const isRole = createValidator((value: string) => {
  return value === 'student' || value === 'teacher';
});

const isEmail = createValidator((value: string) => {
  return !!value.includes('@');
});

const minStringLength = createValidator((value: string, minLength: number) => {
  return value.length >= minLength;
});

const isEqual = createValidator((value1: string, value2: string) => {
  return value1 === value2;
});

const isChecked = createValidator((value: boolean) => {
  return value;
});

function BadForm() {
  const renderCount = useRef(0);
  renderCount.current++;

  // Все поля задаем в state, при изменении любого поля вся форма рендерится заново.
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState<Role | ''>('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreement, setAgreement] = useState(false);

  // Ошибки храним отдельно от полей
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [roleError, setRoleError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [agreementError, setAgreementError] = useState('');

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setRole('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setAgreement(false);
  };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Проверки делаем для каждого поля отдельно, нет общей схемы с правилами
    // валидации и типизацией. Реализовать валидацию и вывод ошибки при изменении
    // поля в реальном времени (без схемы, дублирования логики) сложно.
    if (
      [
        notEmpty(firstName, () => setFirstNameError('Введите имя')),
        notEmpty(lastName, () => setLastNameError('Введите фамилию')),
        isRole(role, () => setRoleError('Выберите роль')),

        // Очень простая валидация (реализацию см. выше), проверку проходят некорректные email.
        isEmail(email, () => setEmailError('Введите корректный email')),
        minStringLength(password, 8, () =>
          setPasswordError('Пароль должен содержать минимум 8 символов'),
        ),

        // Совпадение паролей лучше проверять во время их набора пользователем.
        isEqual(password, confirmPassword, () =>
          setConfirmPasswordError('Пароли не совпадают'),
        ),
        isChecked(agreement, () => setAgreementError('<-- Примите условия')),
      ].includes(false)
    ) {
      return;
    }

    try {
      await sendForm({ email });
      resetForm();
    } catch (error) {
      if (error instanceof Error) {
        // Ошибку от сервера выводим в alert (некрасиво).
        alert(error.message);
      }
    }
  };

  return (
    <form
      noValidate
      className="flex flex-col items-stretch gap-2"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit}
    >
      <div>Количество отрисовок: {renderCount.current}</div>
      <div className="flex gap-2">
        <label className="flex grow flex-col items-stretch gap-1">
          <span>Имя</span>
          <input
            type="text"
            name="firstName"
            className="min-w-0 rounded-md border border-gray-800 px-2 py-1"
            value={firstName}
            // Вручную обновляем поля и, например, сбрасываем ошибки.
            onChange={(e) => {
              setFirstName(e.target.value);
              setFirstNameError('');
            }}
          />
          {!!firstNameError && (
            // Нет aria-invalid, aria-describedby (accessibility для пользователей с ограниченными возможностями).
            <span className="text-red-500">{firstNameError}</span>
          )}
        </label>
        <label className="flex grow flex-col items-stretch gap-1">
          <span>Фамилия</span>
          <input
            type="text"
            name="lastName"
            className="min-w-0 rounded-md border border-gray-800 px-2 py-1"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              setLastNameError('');
            }}
          />
          {!!lastNameError && (
            <span className="text-red-500">{lastNameError}</span>
          )}
        </label>
      </div>
      <label className="flex flex-col items-stretch gap-1">
        <span>Роль</span>
        <select
          name="role"
          className="rounded-md border border-gray-800 px-2 py-1"
          value={role}
          onChange={(e) => {
            setRole(e.target.value as Role);
            setRoleError('');
          }}
        >
          <option value="" disabled>
            Выберите роль
          </option>
          <option value="student">Студент</option>
          <option value="teacher">Преподаватель</option>
        </select>
        {!!roleError && <span className="text-red-500">{roleError}</span>}
      </label>
      <label className="flex flex-col items-stretch gap-1">
        <span>Email</span>
        <input
          type="email"
          name="email"
          className="min-w-0 rounded-md border border-gray-800 px-2 py-1"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError('');
          }}
        />
        {!!emailError && <span className="text-red-500">{emailError}</span>}
      </label>
      <label className="flex flex-col items-stretch gap-1">
        <span>Пароль</span>
        <input
          type="password"
          name="password"
          className="min-w-0 rounded-md border border-gray-800 px-2 py-1"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError('');
          }}
        />
        {!!passwordError && (
          <span className="text-red-500">{passwordError}</span>
        )}
      </label>
      <label className="flex flex-col items-stretch gap-1">
        <span>Подтвердите пароль</span>
        <input
          type="password"
          name="confirmPassword"
          className="min-w-0 rounded-md border border-gray-800 px-2 py-1"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setConfirmPasswordError('');
          }}
        />
        {!!confirmPasswordError && (
          <span className="text-red-500">{confirmPasswordError}</span>
        )}
      </label>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="agreement"
          className="size-4"
          checked={agreement}
          onChange={(e) => {
            setAgreement(e.target.checked);
            setAgreementError('');
          }}
        />
        <span>Принимаю условия</span>
        {!!agreementError && (
          <span className="text-red-500">{agreementError}</span>
        )}
      </label>
      {/* Кнопка не блокируется на время запроса, можно отправить несколько запросов подряд. */}
      <button
        type="submit"
        className="rounded-md border border-gray-800 bg-gray-800 px-2 py-1 text-gray-300 hover:opacity-80"
      >
        Зарегистрироваться
      </button>
    </form>
  );
}

function createValidator<T, P = undefined>(
  validationFn: ((value: T) => boolean) | ((value: T, param: P) => boolean),
) {
  return (
    value: T,
    ...args: P extends undefined ? [() => void] : [P, () => void]
  ) => {
    const [param, onError] =
      args.length === 2 ? args : [undefined as P, args[0]];
    const isValid = validationFn(value, param);
    if (!isValid) onError();
    return isValid;
  };
}

async function sendForm(formData: { email: string }) {
  await sleep(1500);

  if (formData.email.startsWith('taken@')) {
    throw new Error('Этот email уже занят');
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function BadFormExample() {
  return (
    <div className="space-y-2">
      <h2 className="mb-4 text-xl font-medium">2.1. «Плохая» форма</h2>
      <BadForm />
    </div>
  );
}
