import styles from "./Column.module.scss";

export type ColumnProps<T> = {
  title: string;
  cardData: T[];
  renderCard: (data: T) => JSX.Element;
};

const Column = <T extends {}>({
  title,
  cardData,
  renderCard,
}: ColumnProps<T>) => {
  return (
    <div className={styles.column}>
      <h3 className={styles.title}>{title}</h3>
      <ul className={styles.cardsList}>
        {cardData?.map((card: T, index) => (
          <li key={index} className={styles.card}>
            {renderCard(card)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Column;
