import { AnimatePresence, motion } from 'framer-motion';
import { useTodos } from './hooks/useTodos';
import { Sidebar } from './components/Sidebar';
import { AddTaskForm } from './components/AddTaskForm';
import { TaskItem } from './components/TaskItem';
import { EmptyState } from './components/EmptyState';
import styles from './App.module.css';

export default function App() {
  const {
    tasks,
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
  } = useTodos();

  return (
    <div className={styles.layout}>
      {/* SVG gradient def for ring */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="progressGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f9a8d4" />
            <stop offset="100%" stopColor="#c4b5fd" />
          </linearGradient>
        </defs>
      </svg>

      <Sidebar
        categories={categories}
        tags={tags}
        filter={filter}
        setFilter={setFilter}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedTags={selectedTags}
        toggleTagFilter={toggleTagFilter}
        stats={stats}
        search={search}
        setSearch={setSearch}
      />

      <main className={styles.main}>
        {/* Top bar */}
        <div className={styles.topBar}>
          <div className={styles.topLeft}>
            <h2 className={styles.heading}>
              {filter === 'all' ? 'All Tasks' : filter === 'active' ? 'Active' : 'Completed'}
              {selectedCategory && categories.find(c => c.id === selectedCategory) && (
                <span className={styles.headingSub}>
                  {' '}· {categories.find(c => c.id === selectedCategory)?.name}
                </span>
              )}
            </h2>
            <p className={styles.taskCount}>
              {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
            </p>
          </div>

          {stats.completed > 0 && (
            <button className={styles.clearBtn} onClick={clearCompleted}>
              Clear completed
            </button>
          )}
        </div>

        {/* Add task */}
        <AddTaskForm categories={categories} tags={tags} onAdd={addTask} />

        {/* Task list */}
        <motion.div className={styles.taskList} layout>
          <AnimatePresence mode="popLayout">
            {tasks.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <EmptyState filter={filter} hasSearch={!!search} />
              </motion.div>
            ) : (
              tasks.map(task => (
                <TaskItem
                  key={task.id}
                  task={task}
                  categories={categories}
                  tags={tags}
                  onToggle={toggleTask}
                  onDelete={deleteTask}
                  onUpdate={updateTask}
                />
              ))
            )}
          </AnimatePresence>
        </motion.div>

        {/* Footer */}
        <div className={styles.footer}>
          <span className={styles.footerText}>
            Made with ✿ by Petal &nbsp;·&nbsp; {stats.completed} of {stats.total} tasks bloomed
          </span>
        </div>
      </main>
    </div>
  );
}
