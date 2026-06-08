import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Task, Category, Tag } from '../types';
import styles from './TaskItem.module.css';

type Props = {
  task: Task;
  categories: Category[];
  tags: Tag[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
};

const priorityColors: Record<string, string> = {
  low: '#86efac',
  medium: '#fde68a',
  high: '#fca5a5',
};

export function TaskItem({ task, categories, tags, onToggle, onDelete, onUpdate }: Props) {
  const [editing, setEditing] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const inputRef = useRef<HTMLInputElement>(null);

  const category = categories.find(c => c.id === task.categoryId);
  const taskTags = tags.filter(t => task.tags.includes(t.id));

  useEffect(() => {
    if (editing && inputRef.current) inputRef.current.focus();
  }, [editing]);

  const handleSave = () => {
    if (editText.trim()) {
      onUpdate(task.id, { text: editText.trim() });
    }
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') { setEditText(task.text); setEditing(false); }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -12, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, y: 8 }}
      transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
      className={`${styles.task} ${task.completed ? styles.completed : ''}`}
    >
      <div className={styles.mainRow}>
        {/* Priority dot */}
        <div
          className={styles.priorityDot}
          style={{ background: priorityColors[task.priority] }}
          title={`${task.priority} priority`}
        />

        {/* Checkbox */}
        <button
          className={styles.checkbox}
          onClick={() => onToggle(task.id)}
          aria-label={task.completed ? 'Mark incomplete' : 'Mark complete'}
        >
          <AnimatePresence>
            {task.completed && (
              <motion.svg
                key="check"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.18, type: 'spring', stiffness: 300 }}
                viewBox="0 0 16 16" fill="none"
              >
                <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2.2"
                  strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            )}
          </AnimatePresence>
        </button>

        {/* Text */}
        <div className={styles.textArea} onClick={() => setExpanded(v => !v)}>
          {editing ? (
            <input
              ref={inputRef}
              value={editText}
              onChange={e => setEditText(e.target.value)}
              onBlur={handleSave}
              onKeyDown={handleKeyDown}
              className={styles.editInput}
              onClick={e => e.stopPropagation()}
            />
          ) : (
            <span className={styles.taskText}>{task.text}</span>
          )}

          <div className={styles.meta}>
            {category && (
              <span className={styles.categoryBadge} style={{ background: category.color + '44', borderColor: category.color }}>
                {category.emoji} {category.name}
              </span>
            )}
            {taskTags.map(tag => (
              <span key={tag.id} className={styles.tagPill} style={{ background: tag.color + '55' }}>
                #{tag.label}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <button
            className={styles.iconBtn}
            onClick={() => setEditing(v => !v)}
            aria-label="Edit task"
            title="Edit"
          >
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M11.5 2.5l2 2L5 13H3v-2L11.5 2.5z" stroke="currentColor"
                strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            className={`${styles.iconBtn} ${styles.deleteBtn}`}
            onClick={() => onDelete(task.id)}
            aria-label="Delete task"
            title="Delete"
          >
            <svg viewBox="0 0 16 16" fill="none">
              <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.6"
                strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Expanded note */}
      <AnimatePresence>
        {expanded && task.note && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className={styles.noteArea}
          >
            <p className={styles.note}>{task.note}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
