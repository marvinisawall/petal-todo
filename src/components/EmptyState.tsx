import styles from './EmptyState.module.css';

type Props = {
  filter: string;
  hasSearch: boolean;
};

export function EmptyState({ filter, hasSearch }: Props) {
  const getMessage = () => {
    if (hasSearch) return { icon: '🔍', title: 'No tasks found', sub: 'Try a different search term' };
    if (filter === 'completed') return { icon: '✿', title: 'Nothing completed yet', sub: 'Finish some tasks and they\'ll bloom here' };
    if (filter === 'active') return { icon: '🌿', title: 'All caught up!', sub: 'Your garden is in full bloom' };
    return { icon: '🌱', title: 'Your garden is empty', sub: 'Plant your first task above to get started' };
  };

  const { icon, title, sub } = getMessage();

  return (
    <div className={styles.empty}>
      <div className={styles.icon}>{icon}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.sub}>{sub}</p>
    </div>
  );
}
