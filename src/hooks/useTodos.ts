import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Task, Category, Tag, FilterType, Priority } from '../types';
import { DEFAULT_CATEGORIES, DEFAULT_TAGS } from '../utils/defaults';

const STORAGE_KEY = 'petal-todo-data';

type StoredData = {
  tasks: Task[];
  categories: Category[];
  tags: Tag[];
};

function loadFromStorage(): StoredData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return {
    tasks: [
      {
        id: uuidv4(),
        text: 'Welcome to Petal ✿ Add your first task below',
        completed: false,
        categoryId: 'personal',
        tags: ['quick'],
        priority: 'low',
        createdAt: Date.now(),
        completedAt: null,
        note: 'Tap the checkbox to complete, or the × to remove.',
      },
    ],
    categories: DEFAULT_CATEGORIES,
    tags: DEFAULT_TAGS,
  };
}

function saveToStorage(data: StoredData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}

export function useTodos() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [tags, setTags] = useState<Tag[]>(DEFAULT_TAGS);
  const [filter, setFilter] = useState<FilterType>('all');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const data = loadFromStorage();
    setTasks(data.tasks);
    setCategories(data.categories);
    setTags(data.tags);
  }, []);

  useEffect(() => {
    if (tasks.length > 0 || categories.length > 0) {
      saveToStorage({ tasks, categories, tags });
    }
  }, [tasks, categories, tags]);

  const addTask = useCallback((
    text: string,
    categoryId: string | null,
    tagIds: string[],
    priority: Priority,
    note?: string,
  ) => {
    const newTask: Task = {
      id: uuidv4(),
      text,
      completed: false,
      categoryId,
      tags: tagIds,
      priority,
      createdAt: Date.now(),
      completedAt: null,
      note,
    };
    setTasks(prev => [newTask, ...prev]);
  }, []);

  const toggleTask = useCallback((id: string) => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id
          ? { ...t, completed: !t.completed, completedAt: !t.completed ? Date.now() : null }
          : t
      )
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, ...updates } : t)));
  }, []);

  const clearCompleted = useCallback(() => {
    setTasks(prev => prev.filter(t => !t.completed));
  }, []);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active' && task.completed) return false;
    if (filter === 'completed' && !task.completed) return false;
    if (selectedCategory && task.categoryId !== selectedCategory) return false;
    if (selectedTags.length > 0 && !selectedTags.every(tid => task.tags.includes(tid))) return false;
    if (search && !task.text.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    active: tasks.filter(t => !t.completed).length,
  };

  const toggleTagFilter = useCallback((tagId: string) => {
    setSelectedTags(prev =>
      prev.includes(tagId) ? prev.filter(id => id !== tagId) : [...prev, tagId]
    );
  }, []);

  return {
    tasks: filteredTasks,
    allTasks: tasks,
    categories,
    tags,
    filter,
    setFilter,
    selectedCategory,
    setSelectedCategory,
    selectedTags,
    toggleTagFilter,
    search,
    setSearch,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
    clearCompleted,
    stats,
  };
}
