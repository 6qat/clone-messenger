'use client';

import { useCallback, useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '@/app/components/inputs/Input';
import Button from '@/app/components/Button';
import AuthSocialButton from '@/app/(site)/components/AuthSocialButton';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import axios from 'axios';
import toast from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type Variant = 'LOGIN' | 'REGISTER';

export default function AuthForm() {
  const session = useSession();
  const router = useRouter();
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (session.status === 'authenticated') {
      console.log('Authenticated');
      router.push('/users');
    }
  }, [session.status, router]);

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER');
    } else {
      setVariant('LOGIN');
    }
  }, [variant]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === 'REGISTER') {
      axios
        .post('/api/register', data)
        .then(() => {
          signIn('credentials', data).catch(() => {});
        })
        .catch(() => {
          toast.error("Something went wrong. We couldn't create your account.");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
    if (variant === 'LOGIN') {
      signIn('credentials', {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error('Invalid credentials');
          }
          if (callback?.ok && !callback?.error) {
            toast.success('Welcome back!');
            router.push('/users');
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error('Invalid credentials');
        }
        if (callback?.ok && !callback?.error) {
          toast.success('Welcome back!');
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className={`mt-8 sm:mx-auto sm:w-full sm:max-w-md`}>
        <div className={`bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10`}>
          <form
            className={`space-y-6`}
            onSubmit={handleSubmit(onSubmit)}
          >
            {variant === 'REGISTER' && (
              <Input
                id='name'
                label='Name'
                register={register}
                errors={errors}
                disabled={isLoading}
              />
            )}
            <Input
              id='email'
              label='Email address'
              type='email'
              register={register}
              errors={errors}
              disabled={isLoading}
            />
            <Input
              id='password'
              label='Password'
              type='password'
              register={register}
              errors={errors}
              disabled={isLoading}
            />
            <div>
              <Button
                disabled={isLoading}
                fullWidth
                type='submit'
              >
                {variant === 'REGISTER' ? 'Register' : 'Sign In'}
              </Button>
            </div>
          </form>
          <div className={`mt-6`}>
            <div className={`relative`}>
              <div className={`absolute inset-0 flex items-center`}>
                <div className={`w-full border-t border-gray-300`} />
              </div>
              <div className={`relative flex justify-center text-sm`}>
                <span className={`bg-white px-2 text-gray-500`}>
                  Or continue with
                </span>
              </div>
            </div>
            <div className={`mt-6 flex gap-2`}>
              <AuthSocialButton
                icon={BsGithub}
                onClick={() => socialAction('github')}
              />
              <AuthSocialButton
                icon={BsGoogle}
                onClick={() => socialAction('google')}
              />
            </div>
          </div>
          <div
            className={`mt-6 flex justify-center gap-2 px-2 text-sm text-gray-500`}
          >
            <div>
              {variant === 'REGISTER'
                ? 'Already have an account?'
                : 'New to Messenger?'}
            </div>
            <div
              onClick={toggleVariant}
              className={`cursor-pointer underline`}
            >
              {variant === 'REGISTER' ? 'Login' : 'Create an account'}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
