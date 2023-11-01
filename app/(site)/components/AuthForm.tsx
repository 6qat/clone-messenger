'use client';

import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Input from '@/app/components/inputs/Input';
import Button from '@/app/components/Button';

type Variant = 'LOGIN' | 'REGISTER';

export default function AuthForm() {
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);

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
      // Axios Register
    }
    if (variant === 'LOGIN') {
      // NextAuth SignIn
    }
  };

  const socialAction = (action: string) => {
    setIsLoading(true);
    // Next-Auth Social Log In
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
              />
            )}
            <Input
              id='email'
              label='Email address'
              type='email'
              register={register}
              errors={errors}
            />
            <Input
              id='password'
              label='Password'
              type='password'
              register={register}
              errors={errors}
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
          <div className='mt-6'>
            <div className={`relative`}>
              <div className={`absolute inset-0 flex items-center`}>
                <div className={`w-full border-t border-gray-300`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
