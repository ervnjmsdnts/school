import Image from 'next/image';
import { PropsWithChildren } from 'react';

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <div className='w-full h-full'>
      <div className='fixed -z-10 w-screen h-screen'>
        <Image src='/menu.gif' alt='menu' objectFit='fill' layout='fill' />
      </div>
      {children}
    </div>
  );
}
