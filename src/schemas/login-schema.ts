import { z } from 'zod';

const loginSchema = z.object({
  email: z.email({ message: 'Please enter a valid email' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

export { loginSchema };
