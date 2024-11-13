import { writable } from "svelte/store";

const isBrowser = typeof window !== 'undefined';

const initialTheme = isBrowser ? localStorage.getItem('theme') || 'dark' : 'dark';

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