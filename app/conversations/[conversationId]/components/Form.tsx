'use client';
import React from 'react';
import useConversation from '@/app/hooks/useConversation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { HiPaperAirplane, HiPhoto } from 'react-icons/hi2';
import MessageInput from '@/app/conversations/[conversationId]/components/MessageInput';

const Form = () => {
  const { conversationId } = useConversation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setValue('message', '', { shouldValidate: true });
    axios.post('/api/messages', { ...data, conversationId });
  };

  return (
    <div
      className={`flex w-full items-center gap-2 border-t bg-white px-4 py-4 lg:gap-4`}
    >
      <HiPhoto
        size={30}
        className={`text-sky-500`}
      />
      <form
        className={`flex w-full items-center gap-2 lg:gap-4`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <MessageInput
          id='message'
          register={register}
          errors={errors}
          required
          placeholder='Write a message'
        />
        <button
          type={`submit`}
          className={`cursor-pointer rounded-full bg-sky-500 p-2 transition hover:bg-sky-600`}
        >
          <HiPaperAirplane
            size={18}
            className={`text-white`}
          />
        </button>
      </form>
    </div>
  );
};

export default Form;