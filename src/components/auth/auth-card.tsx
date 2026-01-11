'use client';

import { FormEvent, useState } from 'react';

import { useAuth } from '@/hooks';
import { loginSchema, signupSchema } from '@/schemas';
import { AnimatePresence, motion } from 'motion/react';
import { toast } from 'sonner';
import { z } from 'zod';

import { AuthForm } from './auth-form';
import { MobileLogo } from './mobile-logo';

export function AuthCard() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const { signIn, signUp } = useAuth();

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setEmail('');
    setPassword('');
    setDisplayName('');
    setConfirmPassword('');
  };

  const validateForm = () => {
    try {
      if (isLogin) {
        loginSchema.parse({ email, password });
      } else {
        signupSchema.parse({ email, password, confirmPassword, displayName });
      }
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        err.issues.forEach((error) => {
          const path = error.path[0];
          if (path) {
            newErrors[String(path)] = error.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const result = isLogin ? await signIn(email, password) : await signUp(email, password, displayName);

      if (result?.error) {
        handleAuthError(result.error, isLogin);
        setIsLoading(false);
        return;
      }

      handleAuthSuccess(isLogin);

      if (isLogin) {
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 500);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Auth error:', error);
      toast.error('Something went wrong', {
        description: 'An unexpected error occurred. Please try again.',
        position: 'top-center',
        style: {
          background: '#ef4444',
          color: 'white',
          border: 'none',
        },
        duration: 5000,
      });
      setIsLoading(false);
    }
  };

  const handleAuthError = (error: { message: string }, isLogin: boolean) => {
    const errorMessages: Record<string, { title: string; description: string }> = {
      'Invalid login credentials': {
        title: 'Login failed',
        description: 'Invalid email or password. Please try again.',
      },
      'User already registered': {
        title: 'Account exists',
        description: 'This email is already registered. Try signing in instead.',
      },
      'already registered': {
        title: 'Account exists',
        description: 'This email is already registered. Try signing in instead.',
      },
      'Email already in use': {
        title: 'Account exists',
        description: 'This email is already registered. Try signing in instead.',
      },
      duplicate: {
        title: 'Account exists',
        description: 'This email is already registered. Try signing in instead.',
      },
    };

    const matchedError = Object.keys(errorMessages).find((key) =>
      error.message.toLowerCase().includes(key.toLowerCase())
    );

    const errorConfig = matchedError
      ? errorMessages[matchedError]
      : {
          title: isLogin ? 'Login failed' : 'Signup failed',
          description: error.message,
        };

    toast.error(errorConfig.title, {
      description: errorConfig.description,
      position: 'top-center',
      style: {
        background: '#ef4444',
        color: 'white',
        border: 'none',
      },
      duration: 5000,
    });
  };

  const handleAuthSuccess = (isLogin: boolean) => {
    const successMessages = {
      login: {
        title: 'Welcome back!',
        description: "You've successfully signed in.",
      },
      signup: {
        title: 'Welcome to Shiori!',
        description: 'Your account has been created successfully. Check your email to continue.',
      },
    };

    const message = isLogin ? successMessages.login : successMessages.signup;

    toast.success(message.title, {
      description: message.description,
      position: 'top-center',
      style: {
        background: '#22c55d',
        color: 'white',
        border: 'none',
      },
      duration: 5000,
    });
  };

  return (
    <div className="flex flex-1 items-center justify-center p-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <MobileLogo />
        <div className="shiori-card p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'signup'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-foreground mb-2 text-2xl font-semibold">
                {isLogin ? 'Welcome back' : 'Create account'}
              </h2>
              <p className="text-muted-foreground mb-6">
                {isLogin ? 'Sign in to continue to your workspace' : 'Start your productivity journey'}
              </p>
              <AuthForm
                isLogin={isLogin}
                email={email}
                password={password}
                confirmPassword={confirmPassword}
                displayName={displayName}
                showPassword={showPassword}
                errors={errors}
                isLoading={isLoading}
                onEmailChange={setEmail}
                onPasswordChange={setPassword}
                onConfirmPasswordChange={setConfirmPassword}
                onDisplayNameChange={setDisplayName}
                onTogglePassword={() => setShowPassword(!showPassword)}
                onSubmit={handleSubmit}
              />
              <div className="mt-6 text-center">
                <p className="text-muted-foreground text-sm">
                  {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                  <button type="button" onClick={toggleMode} className="text-primary font-medium hover:underline">
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </button>
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
