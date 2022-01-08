import styles from "./Board.module.scss";
import Image from "next/image";
import { Board } from "../../types/Board";

export type BoardProps = Omit<Board, "id" | "created_at">;

const Board = ({ title, imgUrl }: BoardProps) => {
  return (
    <article className={styles.container}>
      {imgUrl && (
        <div className={styles.imageContainer}>
          <Image
            src={imgUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
            objectPosition="50% 20%"
            className={styles.image}
          />
        </div>
      )}
      <h2 className={styles.name}>{title}</h2>
    </article>
  );
};

export default Board;
