import type { Category, Tag } from '../types';

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'personal', name: 'Personal', color: '#f9a8d4', emoji: '🌸' },
  { id: 'work', name: 'Work', color: '#93c5fd', emoji: '💼' },
  { id: 'health', name: 'Health', color: '#86efac', emoji: '🌿' },
  { id: 'creative', name: 'Creative', color: '#fcd34d', emoji: '✨' },
  { id: 'errands', name: 'Errands', color: '#c4b5fd', emoji: '🛍️' },
];

export const DEFAULT_TAGS: Tag[] = [
  { id: 'urgent', label: 'urgent', color: '#fca5a5' },
  { id: 'later', label: 'later', color: '#d1d5db' },
  { id: 'recurring', label: 'recurring', color: '#a5b4fc' },
  { id: 'quick', label: 'quick', color: '#6ee7b7' },
  { id: 'focus', label: 'deep focus', color: '#fde68a' },
];
