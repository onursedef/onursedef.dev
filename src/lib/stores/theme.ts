import { writable } from "svelte/store";

const isBrowser = typeof window !== 'undefined';

// Get the initial theme from localStorage if in the browser, or default to 'light'
const initialTheme = isBrowser ? localStorage.getItem('theme') || 'light' : 'light';

export const theme = writable(initialTheme);

theme.subscribe((value) => {
  if (isBrowser) {
    localStorage.setItem('theme', value); // Save theme preference in local storage
    if (value === 'dark') {
      document.documentElement.classList.add('dark'); // Add 'dark' class
    } else {
      document.documentElement.classList.remove('dark'); // Remove 'dark' class
    }
  }
});