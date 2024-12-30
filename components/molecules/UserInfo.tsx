'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

export default function UserInfo() {
  const { data: session, status, update } = useSession();
  useEffect(() => {
    if (status === 'unauthenticated') {
      update();
    }
    // console.log('hihi')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }
  if (!session) {
    return <p>You are not signed in.{status}</p>;
  }
  return (
    <div className=''>
      <p className='text-lg'>아이디: {session.user.id}</p>
    </div>
  );
}
