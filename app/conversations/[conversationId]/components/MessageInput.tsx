'use client';
import React from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface MessageInputProps {
  id: string;
  type?: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  required?: true;
  placeholder?: string;
}

const MessageInput = ({
  id,
  type,
  register,
  errors,
  required,
  placeholder,
}: MessageInputProps) => {
  return (
    <div className={`relative w-full`}>
      <input
        id={id}
        type={type}
        className={`w-full rounded-full bg-neutral-100 px-4 py-2 font-light text-black focus:outline-none`}
        placeholder={placeholder}
        autoComplete={id}
        {...register(id, { required })}
      />
    </div>
  );
};

export default MessageInput;
