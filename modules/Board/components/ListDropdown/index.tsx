import styles from "./ListDropdown.module.scss";
import cn from "classnames";

type ListDropdownProps = {
  className?: string;
};

const ListDropdown = ({ className }: ListDropdownProps) => {
  return (
    <ul className={cn(styles.listContainer, className)}>
      <li className={styles.listItem}>Rename</li>
      <li className={styles.listItem}>Delete this list</li>
    </ul>
  );
};

export default ListDropdown;
