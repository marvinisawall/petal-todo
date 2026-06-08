import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Category, Tag, Priority } from '../types';
import styles from './AddTaskForm.module.css';

type Props = {
  categories: Category[];
  tags: Tag[];
  onAdd: (text: string, categoryId: string | null, tagIds: string[], priority: Priority, note?: string) => void;
};

export function AddTaskForm({ categories, tags, onAdd }: Props) {
  const [text, setText] = useState('');
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [priority, setPriority] = useState<Priority>('medium');
  const [note, setNote] = useState('');
  const [expanded, setExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text.trim(), categoryId, selectedTags, priority, note.trim() || undefined);
    setText('');
    setNote('');
    setSelectedTags([]);
    setCategoryId(null);
    setPriority('medium');
    setExpanded(false);
  };

  const toggleTag = (id: string) => {
    setSelectedTags(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id]);
  };

  return (
    <motion.div
      className={styles.formCard}
      layout
    >
      <form onSubmit={handleSubmit}>
        <div className={styles.inputRow}>
          <div className={styles.inputWrapper}>
            <svg className={styles.inputIcon} viewBox="0 0 20 20" fill="none">
              <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="1.8"
                strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={text}
              onChange={e => setText(e.target.value)}
              placeholder="Add a new task..."
              className={styles.input}
              onFocus={() => setExpanded(true)}
            />
          </div>
          <button type="submit" className={styles.addBtn} disabled={!text.trim()}>
            <span>Add</span>
          </button>
        </div>

        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.24, ease: [0.4, 0, 0.2, 1] }}
              className={styles.extraFields}
            >
              <div className={styles.fieldGroup}>
                {/* Category */}
                <div className={styles.fieldLabel}>Category</div>
                <div className={styles.chips}>
                  <button
                    type="button"
                    onClick={() => setCategoryId(null)}
                    className={`${styles.chip} ${categoryId === null ? styles.chipActive : ''}`}
                  >
                    None
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategoryId(cat.id)}
                      className={`${styles.chip} ${categoryId === cat.id ? styles.chipActive : ''}`}
                      style={categoryId === cat.id ? { background: cat.color + '55', borderColor: cat.color } : {}}
                    >
                      {cat.emoji} {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.fieldGroup}>
                {/* Tags */}
                <div className={styles.fieldLabel}>Tags</div>
                <div className={styles.chips}>
                  {tags.map(tag => (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => toggleTag(tag.id)}
                      className={`${styles.chip} ${selectedTags.includes(tag.id) ? styles.chipActive : ''}`}
                      style={selectedTags.includes(tag.id) ? { background: tag.color + '55', borderColor: tag.color } : {}}
                    >
                      #{tag.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className={styles.bottomRow}>
                <div className={styles.fieldGroup}>
                  {/* Priority */}
                  <div className={styles.fieldLabel}>Priority</div>
                  <div className={styles.priorityBtns}>
                    {(['low', 'medium', 'high'] as Priority[]).map(p => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPriority(p)}
                        className={`${styles.priorityBtn} ${priority === p ? styles.priorityActive : ''} ${styles[p]}`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div className={styles.fieldGroup} style={{ flex: 1 }}>
                  {/* Note */}
                  <div className={styles.fieldLabel}>Note <span className={styles.optional}>(optional)</span></div>
                  <input
                    type="text"
                    value={note}
                    onChange={e => setNote(e.target.value)}
                    placeholder="Add a little note..."
                    className={styles.noteInput}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  );
}
