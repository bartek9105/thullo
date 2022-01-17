import FeatherIcon from "feather-icons-react";
import { Droppable } from "react-beautiful-dnd";
import BoardDraggable from "../BoardDraggable";
import ListDropdown from "../ListDropdown";
import styles from "./ColumnDroppable.module.scss";

type ColumnDroppableProps<T> = {
  droppableId: string;
  className?: string;
  title: string;
  cardData: T[];
  showColumnDropdown: boolean;
  setShowColumnDropdown: (value: boolean) => void;
};

const renderCard = (card: any) => {
  return <BoardDraggable {...card} />;
};

const ColumnDroppable = <T extends {}>({
  title,
  cardData,
  droppableId,
  className,
  showColumnDropdown,
  setShowColumnDropdown,
}: ColumnDroppableProps<T>) => {
  return (
    <Droppable droppableId={droppableId}>
      {({ droppableProps, innerRef, placeholder }) => (
        <>
          <div {...droppableProps} ref={innerRef} className={className}>
            <div className={styles.column}>
              <div className={styles.titleContainer}>
                <h3 className={styles.title}>{title}</h3>
                <div className={styles.iconContainer}>
                  <FeatherIcon
                    icon="more-horizontal"
                    size={16}
                    className={styles.icon}
                    onClick={() => setShowColumnDropdown(!showColumnDropdown)}
                  />
                  {showColumnDropdown && (
                    <ListDropdown className={styles.dropdown} />
                  )}
                </div>
              </div>
              <ul className={styles.cardsList}>
                {cardData?.map((card: T, index: number) => (
                  <li key={index} className={styles.card}>
                    {renderCard(card)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {placeholder}
        </>
      )}
    </Droppable>
  );
};

export default ColumnDroppable;
