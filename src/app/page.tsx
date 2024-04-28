import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='h-full'>
      <div className='fixed -z-10 w-screen h-screen'>
        <Image
          src='/OpenScreen2.0.gif'
          alt='splashscreen'
          objectFit='fill'
          layout='fill'
        />
      </div>
      <div className='flex justify-center items-center h-full'>
        <Link href='/input-name'>
          <div className='relative top-16 w-80 h-64'>
            <Image
              src='/startBtn.png'
              className='animate-bounce'
              alt='Start Button'
              layout='fill'
            />
          </div>
        </Link>
      </div>
    </main>
  );
}
