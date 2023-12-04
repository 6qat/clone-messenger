'use client';
import React, { useState } from 'react';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import Modal from '@/app/components/Modal';
import Input from '@/app/components/inputs/Input';
import Image from 'next/image';
import { CldUploadButton } from 'next-cloudinary';
import Button from '@/app/components/Button';

interface SettingsModalProps {
  currentUser: User;
  isOpen?: boolean;
  onClose: () => void;
}

const SettingsModal = ({
  currentUser,
  isOpen,
  onClose,
}: SettingsModalProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });

  const image = watch('image');

  const handleUpload = (result: any) => {
    setValue('image', result.secure_url, { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post('/api/settings', data)
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch((e) => {
        toast.error(e.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`space-y-12`}>
          <div className={`border-b border-gray-900/10 pb-12`}>
            <h2 className={`text-base font-semibold leading-7 text-gray-900`}>
              Profile
            </h2>
            <p className={`mt-1 text-sm leading-6 text-gray-600`}>
              Edit your public information.
            </p>
            <div className={`mt-10 flex flex-col gap-y-8`}>
              <Input
                disabled={isLoading}
                required
                label={'Name'}
                id={'name'}
                register={register}
                errors={errors}
              />
              <div>
                <label
                  className={`block text-sm font-medium leading-6 text-gray-900`}
                >
                  Photo
                </label>
                <div className={`mt-2 flex items-center gap-x-3`}>
                  <Image
                    width={48}
                    height={48}
                    className={`rounded-full`}
                    src={
                      image ||
                      currentUser?.image ||
                      'https://flowbite.com/docs/images/people/profile-picture-5.jpg'
                    }
                    alt={'Avatar'}
                  />
                  <CldUploadButton
                    options={{
                      maxFiles: 1,
                    }}
                    onUpload={handleUpload}
                    uploadPreset={`s7gnb5vg`}
                  >
                    <div
                      className={`rounded-md border bg-blue-500 p-2 text-sm text-white`}
                    >
                      Change
                    </div>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>
          <div className={`mt-6 flex items-center justify-end gap-x-6`}>
            <Button
              secondary
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type='submit'
              disabled={isLoading}
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;
