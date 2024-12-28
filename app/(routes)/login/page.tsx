'use client';

import { Button } from '@/components/atoms/Button';
import { AuthInputRef } from '@/components/atoms/Inputs';
import { useFormState, useFormStatus } from 'react-dom';
import { FaLock } from 'react-icons/fa';
// import { CiUser } from "react-icons/ci";
import { FaUser } from 'react-icons/fa';
// import { MdOutlineMailOutline } from 'react-icons/md';
import { useRef } from 'react';
import { authenticate } from '@/lib/actions';

export default function Login() {
  const [errorMsg, dispatchLogin] = useFormState(authenticate, undefined);
  const EmailRef = useRef<HTMLInputElement>(null);
  const PwRef = useRef<HTMLInputElement>(null);

  return (
    <div className='flex flex-col justify-center items-center w-full h-full border-red-800'>
      <div className='flex justify-center items-center flex-col h-fit w-fit rounded-xl p-20 mt-20 bg-opacity-70 absolute z-100'>
        <h1 className='text-2xl font-semibold mb-9 text-hanaPrimary'>
          키워드 하나로
        </h1>
        <form action={dispatchLogin} className='space-y-3 flex flex-col gap-3'>
          <input type='hidden' name='redirectTo' value='/' />
          <AuthInputRef
            name='id'
            label='Id'
            type='text'
            classNames=''
            ref={EmailRef}
          >
            <FaUser />
          </AuthInputRef>
          <AuthInputRef
            name='passwd'
            label='Password'
            type='password'
            classNames=''
            ref={PwRef}
          >
            <FaLock />
          </AuthInputRef>
          <LoginButton />
          <div className='text-red-600'>{errorMsg}</div>
        </form>
      </div>
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <>
      <Button className='w-full' isDisabled={pending}>
        Login
      </Button>
    </>
  );
}
