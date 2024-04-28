import MenuButton from '@/components/menu-button';
import Link from 'next/link';

export default function MainMenuPage() {
  return (
    <main className='h-full'>
      <div className='flex flex-col justify-center items-center gap-4 h-full'>
        <MenuButton href='/subjects'>Subjects</MenuButton>
        <MenuButton href='/about'>About</MenuButton>
        <MenuButton href='/'>Exit</MenuButton>
      </div>
    </main>
  );
}
