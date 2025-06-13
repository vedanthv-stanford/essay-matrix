import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Add your utility functions here

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString();
};
