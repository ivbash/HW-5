/* eslint-disable react-hooks/refs */
import { yupSchema } from '@/schema';
import { useFormik } from 'formik';
import { useRef } from 'react';

function FormikForm() {
  const renderCount = useRef(0);
  renderCount.current++;

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      role: '',
      email: '',
      password: '',
      confirmPassword: '',
      agree: false,
    },
    validationSchema: yupSchema,
    onSubmit: async (values, { setFieldError, resetForm }) => {
      try {
        await sendForm(values);
        resetForm();
      } catch (error) {
        if (error instanceof Error) {
          setFieldError('email', error.message);
        }
      }
    },
  });

  return (
    <form
      noValidate
      className="flex flex-col items-stretch gap-2"
      onSubmit={formik.handleSubmit}
    >
      <div>Количество отрисовок: {renderCount.current}</div>
      <div className="flex gap-2">
        <label className="flex grow flex-col items-stretch gap-1">
          <span>Имя</span>
          <input
            type="text"
            className="min-w-0 rounded-md border border-gray-800 px-2 py-1"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            aria-invalid={
              !!(formik.touched.firstName && formik.errors.firstName)
            }
            aria-describedby="first-name-error"
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <span id="first-name-error" role="alert" className="text-red-500">
              {formik.errors.firstName}
            </span>
          )}
        </label>
        <label className="flex grow flex-col items-stretch gap-1">
          <span>Фамилия</span>
          <input
            type="text"
            className="min-w-0 rounded-md border border-gray-800 px-2 py-1"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            aria-invalid={!!(formik.touched.lastName && formik.errors.lastName)}
            aria-describedby="last-name-error"
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <span id="last-name-error" role="alert" className="text-red-500">
              {formik.errors.lastName}
            </span>
          )}
        </label>
      </div>
      <label className="flex flex-col items-stretch gap-1">
        <span>Роль</span>
        <select
          className="rounded-md border border-gray-800 px-2 py-1"
          name="role"
          value={formik.values.role}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          aria-invalid={!!(formik.touched.role && formik.errors.role)}
          aria-describedby="role-error"
        >
          <option value="">Выберите роль</option>
          <option value="student">Студент</option>
          <option value="teacher">Преподаватель</option>
        </select>
        {formik.touched.role && formik.errors.role && (
          <span id="role-error" role="alert" className="text-red-500">
            {formik.errors.role}
          </span>
        )}
      </label>
      <label className="flex flex-col items-stretch gap-1">
        <span>Email</span>
        <input
          type="email"
          className="min-w-0 rounded-md border border-gray-800 px-2 py-1"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          aria-invalid={!!(formik.touched.email && formik.errors.email)}
          aria-describedby="email-error"
        />
        {formik.touched.email && formik.errors.email && (
          <span id="email-error" role="alert" className="text-red-500">
            {formik.errors.email}
          </span>
        )}
      </label>
      <label className="flex flex-col items-stretch gap-1">
        <span>Пароль</span>
        <input
          type="password"
          className="min-w-0 rounded-md border border-gray-800 px-2 py-1"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          aria-invalid={!!(formik.touched.password && formik.errors.password)}
          aria-describedby="password-error"
        />
        {formik.touched.password && formik.errors.password && (
          <span id="password-error" role="alert" className="text-red-500">
            {formik.errors.password}
          </span>
        )}
      </label>
      <label className="flex flex-col items-stretch gap-1">
        <span>Подтвердите пароль</span>
        <input
          type="password"
          className="min-w-0 rounded-md border border-gray-800 px-2 py-1"
          name="confirmPassword"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          aria-invalid={
            !!(formik.touched.confirmPassword && formik.errors.confirmPassword)
          }
          aria-describedby="confirm-password-error"
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <span
            id="confirm-password-error"
            role="alert"
            className="text-red-500"
          >
            {formik.errors.confirmPassword}
          </span>
        )}
      </label>
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          className="size-4"
          name="agree"
          checked={formik.values.agree}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          aria-invalid={!!(formik.touched.agree && formik.errors.agree)}
          aria-describedby="agree-error"
        />
        <span>Принимаю условия</span>
        {formik.touched.agree && formik.errors.agree && (
          <span id="agree-error" role="alert" className="text-red-500">
            {formik.errors.agree}
          </span>
        )}
      </label>
      <button
        type="submit"
        className="rounded-md border border-gray-800 bg-gray-800 px-2 py-1 text-gray-300 hover:opacity-80 disabled:opacity-50"
        disabled={formik.isSubmitting}
      >
        {formik.isSubmitting ? 'Отправляем...' : 'Зарегистрироваться'}
      </button>
    </form>
  );
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

export function FormikYupFormExample() {
  return (
    <div className="space-y-2">
      <h2 className="mb-4 text-xl font-medium">
        2.3. Альтернативный вариант — Formik + Yup
      </h2>
      <FormikForm />
    </div>
  );
}
