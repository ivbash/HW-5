/* eslint-disable react-hooks/refs */
import { zodSchema, type FormData } from '@/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

function RHFForm() {
  const renderCount = useRef(0);
  renderCount.current++;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    setError,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(zodSchema),
    mode: 'onTouched',
  });

  const onSubmit = async (data: FormData) => {
    try {
      await sendForm(data);
    } catch (error) {
      if (error instanceof Error) {
        setError('email', { message: error.message });
      }
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <form
      noValidate
      className="flex flex-col items-stretch gap-2"
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>Количество отрисовок: {renderCount.current}</div>
      <div className="flex gap-2">
        <label className="flex grow flex-col items-stretch gap-1">
          <span>Имя</span>
          <input
            type="text"
            className="min-w-0 rounded-md border border-gray-800 px-2 py-1"
            aria-invalid={!!errors.firstName}
            aria-describedby="first-name-error"
            {...register('firstName')}
          />
          {errors.firstName && (
            <span id="first-name-error" role="alert" className="text-red-500">
              {errors.firstName.message}
            </span>
          )}
        </label>
        <label className="flex grow flex-col items-stretch gap-1">
          <span>Фамилия</span>
          <input
            type="text"
            className="min-w-0 rounded-md border border-gray-800 px-2 py-1"
            aria-invalid={!!errors.lastName}
            aria-describedby="last-name-error"
            {...register('lastName')}
          />
          {errors.lastName && (
            <span id="last-name-error" role="alert" className="text-red-500">
              {errors.lastName.message}
            </span>
          )}
        </label>
      </div>
      <label className="flex flex-col items-stretch gap-1">
        <span>Роль</span>
        <select
          className="rounded-md border border-gray-800 px-2 py-1"
          aria-invalid={!!errors.role}
          aria-describedby="role-error"
          {...register('role')}
        >
          <option value="">Выберите роль</option>
          <option value="student">Студент</option>
          <option value="teacher">Преподаватель</option>
        </select>
        {errors.role && (
          <span id="role-error" role="alert" className="text-red-500">
            {errors.role.message}
          </span>
        )}
      </label>
      <label className="flex flex-col items-stretch gap-1">
        <span>Email</span>
        <input
          type="email"
          className="min-w-0 rounded-md border border-gray-800 px-2 py-1"
          aria-invalid={!!errors.email}
          aria-describedby="email-error"
          {...register('email')}
        />
        {errors.email && (
          <span id="email-error" role="alert" className="text-red-500">
            {errors.email.message}
          </span>
        )}
      </label>
      <label className="flex flex-col items-stretch gap-1">
        <span>Пароль</span>
        <input
          type="password"
          className="min-w-0 rounded-md border border-gray-800 px-2 py-1"
          aria-invalid={!!errors.password}
          aria-describedby="password-error"
          {...register('password')}
        />
        {errors.password && (
          <span id="password-error" role="alert" className="text-red-500">
            {errors.password.message}
          </span>
        )}
      </label>
      <label className="flex flex-col items-stretch gap-1">
        <span>Подтвердите пароль</span>
        <input
          type="password"
          className="min-w-0 rounded-md border border-gray-800 px-2 py-1"
          aria-invalid={!!errors.confirmPassword}
          aria-describedby="confirm-password-error"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <span
            id="confirm-password-error"
            role="alert"
            className="text-red-500"
          >
            {errors.confirmPassword.message}
          </span>
        )}
      </label>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          className="size-4"
          aria-invalid={!!errors.agree}
          aria-describedby="agree-error"
          {...register('agree')}
        />
        <span>Принимаю условия</span>
        {errors.agree && (
          <span id="agree-error" role="alert" className="text-red-500">
            {errors.agree.message}
          </span>
        )}
      </label>
      <button
        type="submit"
        className="rounded-md border border-gray-800 bg-gray-800 px-2 py-1 text-gray-300 hover:opacity-80 disabled:opacity-50"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Отправляем...' : 'Зарегистрироваться'}
      </button>
    </form>
  );
}

async function sendForm(formData: FormData) {
  await sleep(1500);

  if (formData.email.startsWith('taken@')) {
    throw new Error('Этот email уже занят');
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function RHFZodFormExample() {
  return (
    <div className="space-y-2">
      <h2 className="mb-4 text-xl font-medium">
        2.2. «Хорошая» форма — React Hook Form + Zod
      </h2>
      <RHFForm />
    </div>
  );
}
