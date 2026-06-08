import { motion } from 'framer-motion';
import type { Category, Tag, FilterType } from '../types';
import styles from './Sidebar.module.css';

type Props = {
  categories: Category[];
  tags: Tag[];
  filter: FilterType;
  setFilter: (f: FilterType) => void;
  selectedCategory: string | null;
  setSelectedCategory: (id: string | null) => void;
  selectedTags: string[];
  toggleTagFilter: (id: string) => void;
  stats: { total: number; completed: number; active: number };
  search: string;
  setSearch: (s: string) => void;
};

export function Sidebar({
  categories, tags, filter, setFilter,
  selectedCategory, setSelectedCategory,
  selectedTags, toggleTagFilter,
  stats, search, setSearch,
}: Props) {
  const completion = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <aside className={styles.sidebar}>
      {/* Header */}
      <div className={styles.brand}>
        <div className={styles.brandIcon}>✿</div>
        <div>
          <h1 className={styles.brandName}>Petal</h1>
          <p className={styles.brandTagline}>your gentle task garden</p>
        </div>
      </div>

      {/* Progress ring */}
      <div className={styles.progressCard}>
        <div className={styles.ringWrap}>
          <svg viewBox="0 0 56 56" className={styles.ring}>
            <circle cx="28" cy="28" r="22" className={styles.ringBg} />
            <circle
              cx="28" cy="28" r="22"
              className={styles.ringFill}
              strokeDasharray={`${2 * Math.PI * 22}`}
              strokeDashoffset={`${2 * Math.PI * 22 * (1 - completion / 100)}`}
              transform="rotate(-90 28 28)"
            />
          </svg>
          <span className={styles.ringPct}>{completion}%</span>
        </div>
        <div className={styles.statsList}>
          <div className={styles.stat}>
            <span className={styles.statNum}>{stats.active}</span>
            <span className={styles.statLabel}>remaining</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>{stats.completed}</span>
            <span className={styles.statLabel}>done</span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className={styles.searchWrap}>
        <svg className={styles.searchIcon} viewBox="0 0 16 16" fill="none">
          <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.4" />
          <path d="M10.5 10.5L13 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search tasks..."
          className={styles.searchInput}
        />
        {search && (
          <button className={styles.clearSearch} onClick={() => setSearch('')}>×</button>
        )}
      </div>

      {/* Status filters */}
      <nav className={styles.nav}>
        <div className={styles.navLabel}>View</div>
        {(['all', 'active', 'completed'] as FilterType[]).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`${styles.navBtn} ${filter === f ? styles.navActive : ''}`}
          >
            <span className={styles.navIcon}>
              {f === 'all' ? '◈' : f === 'active' ? '◇' : '◆'}
            </span>
            <span className={styles.navText}>
              {f === 'all' ? 'All Tasks' : f === 'active' ? 'Active' : 'Completed'}
            </span>
            {f === 'all' && <span className={styles.navCount}>{stats.total}</span>}
            {f === 'active' && <span className={styles.navCount}>{stats.active}</span>}
            {f === 'completed' && <span className={styles.navCount}>{stats.completed}</span>}
            {filter === f && (
              <motion.div
                layoutId="nav-indicator"
                className={styles.navIndicator}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </nav>

      {/* Categories */}
      <nav className={styles.nav}>
        <div className={styles.navLabel}>Categories</div>
        <button
          onClick={() => setSelectedCategory(null)}
          className={`${styles.navBtn} ${selectedCategory === null ? styles.navActive : ''}`}
        >
          <span className={styles.navIcon}>🌸</span>
          <span className={styles.navText}>All categories</span>
          {selectedCategory === null && (
            <motion.div layoutId="cat-indicator" className={styles.navIndicator}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
          )}
        </button>
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`${styles.navBtn} ${selectedCategory === cat.id ? styles.navActive : ''}`}
          >
            <span className={styles.navIcon}>{cat.emoji}</span>
            <span className={styles.navText}>{cat.name}</span>
            <span className={styles.catDot} style={{ background: cat.color }} />
            {selectedCategory === cat.id && (
              <motion.div layoutId="cat-indicator" className={styles.navIndicator}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
            )}
          </button>
        ))}
      </nav>

      {/* Tags */}
      <div className={styles.tagsSection}>
        <div className={styles.navLabel}>Tags</div>
        <div className={styles.tagCloud}>
          {tags.map(tag => (
            <button
              key={tag.id}
              onClick={() => toggleTagFilter(tag.id)}
              className={`${styles.tagBtn} ${selectedTags.includes(tag.id) ? styles.tagActive : ''}`}
              style={selectedTags.includes(tag.id) ? { background: tag.color + '55', borderColor: tag.color } : {}}
            >
              #{tag.label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
