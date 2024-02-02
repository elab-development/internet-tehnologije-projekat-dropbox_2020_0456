'use client';

import { useEffect, useState } from 'react';
import { SignInButton, SignedOut, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
import { ThemeToggler } from './ThemeToggler';

function Header() {
  const [temp, setTemp] = useState(null);

  useEffect(() => {
    const getWeather = async () => {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=belgrade&units=metric&appid=6c7c6a462f348f58f0cd8bc3b458ce53`
        );
        setTemp(res.data.main.temp);
      } catch (error) {
        console.log(error);
      }
    };

    getWeather();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <header className='flex items-center justify-between'>
      <Link href='/' className='flex items-center space-x-2'>
        <div className='bg-[#0160FE] w-fit'>
          <Image
            src='https://www.shareicon.net/download/2016/07/13/606936_dropbox_2048x2048.png'
            alt='dropbox-logo'
            className='invert'
            height={50}
            width={50}
          />
        </div>
        <h1 className='font-bold text-xl'>Dropbox</h1>
      </Link>

      <div className='px-5 flex space-x-2 items-center'>
        <span>{temp}°C</span>
        {/* Theme Toggler */}
        <ThemeToggler />

        {/* If we are logged in */}
        <UserButton afterSignOutUrl='/' />
        {/* If we're not logged in */}
        <SignedOut>
          <SignInButton afterSignInUrl='/dashboard' mode='modal' />
        </SignedOut>
      </div>
    </header>
  );
}

export default Header;
