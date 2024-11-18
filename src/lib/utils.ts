import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const FONTS = [
  { name: 'Arial', style: 'Arial, sans-serif' },
  { name: 'Helvetica', style: 'Helvetica, sans-serif' },
  { name: 'Times New Roman', style: '"Times New Roman", serif' },
  { name: 'Courier', style: 'Courier, monospace' },
  { name: 'Verdana', style: 'Verdana, sans-serif' },
  { name: 'Georgia', style: 'Georgia, serif' },
  { name: 'Palatino', style: '"Palatino Linotype", "Book Antiqua", Palatino, serif' },
  { name: 'Garamond', style: 'Garamond, serif' },
  { name: 'Bookman', style: '"Bookman Old Style", serif' },
  { name: 'Comic Sans MS', style: '"Comic Sans MS", cursive' },
  { name: 'Trebuchet MS', style: '"Trebuchet MS", sans-serif' },
  { name: 'Arial Black', style: '"Arial Black", sans-serif' },
  { name: 'Impact', style: 'Impact, sans-serif' }
]
