import { z } from 'zod';
import * as yup from 'yup';

export const zodSchema = z
  .object({
    firstName: z.string().min(2, 'Минимум 2 символа'),
    lastName: z.string().min(2, 'Минимум 2 символа'),
    email: z.string().email('Некорректный email'),
    password: z
      .string()
      .min(8, 'Минимум 8 символов')
      .regex(/[A-Z]/, 'Нужна заглавная буква')
      .regex(/[0-9]/, 'Нужна цифра'),
    confirmPassword: z.string(),
    role: z.string().min(1, 'Выберите роль'),
    agree: z.boolean().refine((v) => v === true, 'Примите условия'),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export type FormData = z.infer<typeof zodSchema>;

export const yupSchema = yup.object({
  firstName: yup
    .string()
    .min(2, 'Минимум 2 символа')
    .required('Обязательное поле'),
  lastName: yup
    .string()
    .min(2, 'Минимум 2 символа')
    .required('Обязательное поле'),
  email: yup.string().email('Некорректный email').required('Обязательное поле'),
  password: yup
    .string()
    .min(8, 'Минимум 8 символов')
    .matches(/[A-Z]/, 'Нужна заглавная буква')
    .required('Обязательное поле'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароли не совпадают')
    .required('Обязательное поле'),
  role: yup.string().required('Выберите роль'),
  agree: yup.boolean().oneOf([true], 'Примите условия'),
});
