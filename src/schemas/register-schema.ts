import { z } from 'zod';

import { loginSchema } from './login-schema';

const signupSchema = loginSchema
  .extend({
    displayName: z.string().trim().min(1, { message: 'Display name is required' }).max(50),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export { signupSchema };
