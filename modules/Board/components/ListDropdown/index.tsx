import styles from "./ListDropdown.module.scss";
import cn from "classnames";

type ListDropdownProps = {
  className?: string;
  onRename?: () => void;
  onDelete: () => void;
};

const ListDropdown = ({ className, onRename, onDelete }: ListDropdownProps) => {
  return (
    <ul className={cn(styles.listContainer, className)}>
      <li className={styles.listItem} onClick={onRename}>
        Rename
      </li>
      <li className={styles.listItem} onClick={onDelete}>
        Delete this list
      </li>
    </ul>
  );
};

export default ListDropdown;
