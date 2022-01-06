import styles from "./Board.module.scss";
import Image from "next/image";
import { Board } from "../../types/Board";

type BoardProps = Omit<Board, "id" | "created_at"> & {
  innerRef?: any;
};

const Board = ({ name, imgUrl, innerRef, ...restProps }: BoardProps) => {
  return (
    <article className={styles.container} ref={innerRef}>
      {imgUrl && (
        <div className={styles.imageContainer}>
          <Image
            src={imgUrl}
            alt={name}
            layout="fill"
            objectFit="cover"
            objectPosition="50% 20%"
            className={styles.image}
            {...restProps}
          />
        </div>
      )}
      <h2 className={styles.name}>{name}</h2>
    </article>
  );
};

export default Board;
