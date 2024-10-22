"use client";

import React, { useState, useEffect } from 'react';
import { FaRegSun, FaRegMoon } from "react-icons/fa";

function ThemeSwitcher() {
  const [storedTheme, setStoredTheme] = useState<string | null>(null);
  const [isLight, setIsLight] = useState(true); // default to light theme

  // Fetch theme from localStorage and set initial theme
  useEffect(() => {
    const theme = window.localStorage.getItem('prefered-theme');
    if (theme) {
      setStoredTheme(theme);
      setIsLight(theme === 'lightTheme');
    }
  }, []);

  // Function to switch to light theme
  const setLightTheme = () => {
    setIsLight(true);
    window.localStorage.setItem('prefered-theme', 'lightTheme');
    document.documentElement.classList.remove('dark');
  };

  // Function to switch to dark theme
  const setDarkTheme = () => {
    setIsLight(false);
    window.localStorage.setItem('prefered-theme', 'darkTheme');
    document.documentElement.classList.add('dark');
  };

  // Update the theme class on the document when storedTheme changes
  useEffect(() => {
    if (storedTheme === 'darkTheme') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [storedTheme]);
  
  return (
    <div className='theme-switcher items-center justify-center align-middle text-info '>
      <button
        type='button'
        className={`dark-mode-switch border-none cursor-pointer 
         ${!isLight && 'hidden'} text-border ml-5`}
        onClick={setDarkTheme}
      >
        <FaRegMoon color='navy' size={40} />
      </button>
      <button
        type='button'
        className={`light-mode-switch cursor-pointer 
         ${isLight && 'hidden'} text-border border-none ml-5`}
        onClick={setLightTheme}
      >
        <FaRegSun color='goldenrod' size={40}  />
      </button>
    </div>
  );
}
export default ThemeSwitcher;